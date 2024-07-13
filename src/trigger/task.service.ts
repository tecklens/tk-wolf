import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { ProducerService } from '@app/kafka/producer/producer.service';
import { NodeRepository } from '@libs/repositories/node/node.repository';
import { WfNodeType } from '@libs/shared/entities/workflow/node.interface';
import { EdgeRepository } from '@libs/repositories/edge/edge.repository';
import { INextJob, IWebhookData } from '@libs/shared/entities/workflow';
import { TaskRepository } from '@libs/repositories/task/task.repository';
import { KafkaMessage } from 'kafkajs';
import {
  ProviderEntity,
  ProviderRepository,
} from '@libs/repositories/provider';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import {
  ChatFactory,
  IContent,
  MailFactory,
  SmsFactory,
} from '@app/provider/factories';
import { NodeEntity } from '@libs/repositories/node/node.entity';
import { INodeData } from '@tps/i-node.data';
import { makeid, transformContent } from '@libs/utils';
import { TaskStatus } from '@tps/task.interface';
import { MemberEntity, MemberRepository } from '@libs/repositories/member';
import { GetTaskRequestDto } from '@app/trigger/dtos/get-task.request';
import { TaskResponseDto } from '@app/trigger/dtos/get-task.response.dto';
import { HttpService } from '@nestjs/axios';
import { PlatformException } from '@pak/utils/exceptions';
import { get } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { VariableRepository } from '@libs/repositories/variable/variable.repository';
import { VariableEntity } from '@libs/repositories/variable/variable.entity';
import { decryptCredentials } from '@libs/shared/encryptions/encrypt-provider';
import { IEventQueue, IJwtPayload, INextJobProps } from '@libs/shared/types';
import { NotificationService } from '@app/notification/notification.service';
import { ConsumerService } from '@app/kafka/consumer/consumer.service';
import { TaskTimelineRepository } from '@libs/repositories/task-timeline/task-timeline.repository';
import { ITaskTimeline } from '@libs/shared/entities/workflow/task.interface';
import { EventTypes } from '@libs/shared/types/events/event-types';

@Injectable()
export class TaskService {
  private logger = new Logger('TaskService');
  private topicTaskTimeline: string;

  constructor(
    private readonly sender: ProducerService,
    private readonly nodeRepository: NodeRepository,
    private readonly edgeRepository: EdgeRepository,
    private readonly taskRepository: TaskRepository,
    private readonly providerRepository: ProviderRepository,
    private readonly memberRepository: MemberRepository,
    private readonly variableRepository: VariableRepository,
    private readonly taskTimelineRepository: TaskTimelineRepository,
    private readonly httpService: HttpService,
    private readonly notificationService: NotificationService,
    private readonly producerService: ProducerService,
  ) {
    this.topicTaskTimeline = process.env.KAFKA_LOG_TASK_TIMELINE;
  }

  async saveTaskTimeline(message: KafkaMessage) {
    const strData = message.value.toString();

    const data: IEventQueue<ITaskTimeline> = JSON.parse(strData);

    await this.taskTimelineRepository.create({
      event: data.type,
      createdAt: data.createdAt,
      ...data.data,
    });
  }

  async nextJob({
    workflowId,
    workflowName,
    orgId,
    envId,
    target,
    overrides,
    userId,
    type,
    previousNodeId,
    transactionId,
  }: INextJobProps) {
    let node: NodeEntity;
    if (type === 'starter') {
      node = await this.nodeRepository.findOneByWorkflowIdAndType(
        workflowId,
        WfNodeType.starter,
      );
    } else {
      node = await this.nodeRepository.findById(previousNodeId);
    }

    if (node == null)
      throw new NotFoundException('Workflow not have starter node');

    const edges = await this.edgeRepository.findBySource(node._id);

    if (edges.length > 0) {
      const nodesTarget = await this.nodeRepository.findByIdIn(
        edges.map((e) => e.target),
      );
      for (const n of nodesTarget) {
        const dataTransfer: INextJob = {
          currentNodeId: n._id,
          organizationId: orgId,
          environmentId: envId,
          target: target,
          workflowId,
          workflowName,
          userId,
          overrides: overrides,
          transactionId: transactionId,
        };

        this.sender.produce({
          messages: [
            {
              key: userId,
              value: JSON.stringify(dataTransfer),
            },
          ],
          topic: process.env.KAFKA_NEXT_JOB_TOPIC ?? '',
        });
      }
    }
  }

  async exeNextJob({
    topic,
    partition,
    message,
  }: {
    topic: string;
    partition: number;
    message: KafkaMessage;
  }) {
    this.logger.log(`Next job with topic ${topic} , partition ${partition}`);

    const strData = message.value.toString();

    if (strData) {
      const data: INextJob = JSON.parse(strData);

      if (data.currentNodeId) {
        const node = await this.nodeRepository.findById(
          data.currentNodeId,
          '_providerId deleted data type',
        );

        if (!node) return;

        const provider = await this.providerRepository.findById(
          node._providerId,
          'channel credentials active name identifier primary conditions _environmentId _organizationId providerId',
        );

        let members: any[] = [];
        try {
          members = await this.memberRepository.getOrganizationMembers(
            data.organizationId,
          );
        } catch (e) {
          this.logger.log('Not members in workflow org');
        }

        let variables = null;
        switch (node.type) {
          case ChannelTypeEnum.EMAIL:
            variables = await this.variableRepository.findByWfId(
              data.workflowId,
            );
            await this.executeEmail(provider, node, data, members, variables);
            break;
          case ChannelTypeEnum.DELAY:
            await this.executeDelay(node.data, strData, data.userId);
            break;
          case ChannelTypeEnum.WEBHOOK:
            await this.executeWebhook(node, data);
            break;
          case ChannelTypeEnum.SMS:
            variables = await this.variableRepository.findByWfId(
              data.workflowId,
            );
            await this.executeSms(provider, node, data, members, variables);
            break;
          case ChannelTypeEnum.CHAT:
            variables = await this.variableRepository.findByWfId(
              data.workflowId,
            );
            await this.executeChatMessage(
              provider,
              node,
              data,
              members,
              variables,
            );
            break;
          default:
            return;
        }
      } else {
        this.logger.error('Message not node id');
      }
    }
  }

  private async executeDelay(data: INodeData, strData: string, userId: string) {
    if (data.delayTime && data.period) {
      await this.sender.produce({
        topic: process.env.KAFKA_DELAY_JOB,
        messages: [
          {
            key: userId,
            value: JSON.stringify({
              delayTime: data.delayTime,
              period: data.period,
              data: strData,
            }),
          },
        ],
      });
    }
  }

  private async executeWebhook(node: NodeEntity, inp: INextJob) {
    if (node.data?.webhookUrl && node.data?.method) {
      const task = await this.taskRepository.create({
        _userId: inp.userId,
        _environmentId: inp.environmentId,
        _organizationId: inp.organizationId,
        _workflowId: node._workflowId,
        workflowName: inp.workflowName,
        _nodeId: node._id,
        _providerId: null,
        providerName: 'Webhook',
        payload: node.data,
        channel: null,
        code: 'TASK-' + makeid(8),
        name: 'Webhook',
        type: node.type,
        status: TaskStatus.in_process,
        priority: 'medium',
        email: inp.target.email,
      });

      const dataSend: IWebhookData = {
        _workflowId: inp.workflowId,
        _userId: inp.userId,
        requestData: inp,
        taskId: task._id,
      };

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this;
      try {
        this.httpService
          .request({
            method: node.data.method,
            url: node.data.webhookUrl,
            data: node.data.method === 'get' ? null : dataSend,
            headers: {
              'Content-Type': 'application/json',
            },
            params: node.data.method === 'get' ? dataSend : null,
            validateStatus: null,
          })
          .toPromise()
          .then((response) => {
            _this.taskRepository.updateStatus(
              task._id,
              response.status < 300 && response.status >= 200
                ? TaskStatus.done
                : TaskStatus.cancel,
              null,
              response.data,
            );
          });
      } catch (e) {
        await this.markCancelTask(task._id, inp.userId, inp.workflowId);
      }
    }
  }

  private async executeSms(
    provider: ProviderEntity,
    node: NodeEntity,
    inp: INextJob,
    members: MemberEntity[],
    variables: VariableEntity[],
    overrides: Record<string, any> = {},
  ) {
    if (!provider) return;
    // * validate sms
    const content: IContent = get(node.data, 'content');
    const phone = overrides.to || inp.target.phone;

    if (!content)
      throw new PreconditionFailedException('Content sms provider is required');
    if (!phone)
      throw new PreconditionFailedException(
        'Target phone number of sms provider is required',
      );
    let contentPlainText = overrides.content || content.plainText;
    contentPlainText = transformContent(variables, contentPlainText, {
      ...inp.target,
      ...inp.overrides,
    });

    const task = await this.taskRepository.create({
      _userId: inp.userId,
      _environmentId: inp.environmentId,
      _organizationId: inp.organizationId,
      _workflowId: node._workflowId,
      workflowName: inp.workflowName,
      _nodeId: node._id,
      _providerId: null,
      providerName: provider.name,
      payload: node.data,
      channel: null,
      code: 'TASK-' + makeid(8),
      name: provider.name,
      type: node.type,
      status: TaskStatus.in_process,
      priority: 'medium',
      email: inp.target.email,
      phone: inp.target.phone,
      transactionId: inp.transactionId,
    });
    try {
      const identifier = uuidv4();
      const overrides = inp.overrides ?? {};

      const smsFactory = new SmsFactory();
      const smsHandler = smsFactory.getHandler(
        this.buildFactoryIntegration(provider),
      );
      if (!smsHandler) {
        throw new PlatformException(
          `Sms handler for provider ${provider.providerId} is  not found`,
        );
      }

      const result = await smsHandler.send({
        to: phone,
        from: overrides.from || provider.credentials.from,
        content: contentPlainText,
        id: identifier,
        customData: overrides.customData || {},
      });

      if (!result?.id) {
        await this.markCancelTask(task._id, inp.userId, inp.workflowId);
        return;
      }

      await this.markDoneTask(task._id, inp.userId, inp.workflowId);
    } catch (e) {
      // await this.sendErrorStatus(
      //   message,
      //   'error',
      //   'unexpected_sms_error',
      //   e.message || e.name || 'Un-expect SMS provider error',
      //   command,
      //   LogCodeEnum.SMS_ERROR,
      //   e,
      // );

      this.logger.error(e);
      await this.markCancelTask(task._id, inp.userId, inp.workflowId);
    }
  }

  private async executeChatMessage(
    provider: ProviderEntity,
    node: NodeEntity,
    inp: INextJob,
    members: MemberEntity[],
    variables: VariableEntity[],
    overrides: Record<string, any> = {},
  ) {
    try {
      if (!provider) return;
      // * validate sms
      const content: IContent = get(node.data, 'content');
      const phone = overrides.to || inp.target.phone;

      if (!content)
        throw new PreconditionFailedException(
          'Content sms provider is required',
        );
      if (!phone)
        throw new PreconditionFailedException(
          'Target phone number of sms provider is required',
        );
      let contentPlainText = overrides.content || content.plainText;
      contentPlainText = transformContent(variables, contentPlainText, {
        ...inp.target,
        ...inp.overrides,
      });

      const task = await this.taskRepository.create({
        _userId: inp.userId,
        _environmentId: inp.environmentId,
        _organizationId: inp.organizationId,
        _workflowId: node._workflowId,
        workflowName: inp.workflowName,
        _nodeId: node._id,
        _providerId: null,
        providerName: provider.name,
        payload: node.data,
        channel: null,
        code: 'TASK-' + makeid(8),
        name: provider.name,
        type: node.type,
        status: TaskStatus.in_process,
        priority: 'medium',
        email: inp.target.email,
        phone: inp.target.phone,
        transactionId: inp.transactionId,
      });
      try {
        const identifier = uuidv4();
        const overrides = inp.overrides ?? {};
        const plainProvider = this.buildFactoryIntegration(provider);

        const chatFactory = new ChatFactory();
        const chatHandler = chatFactory.getHandler(plainProvider);
        if (!chatHandler) {
          throw new PlatformException(
            `Chat message handler for provider ${provider.providerId} is  not found`,
          );
        }

        const chatWebhookUrl =
          overrides?.baseUrl || provider.credentials?.baseUrl;

        const result = await chatHandler.send({
          webhookUrl: chatWebhookUrl,
          channel: plainProvider.credentials?.channel,
          content: contentPlainText,
          chatId: plainProvider.credentials.chatId,
          token: plainProvider.credentials.token,
          baseUrl: plainProvider.credentials.baseUrl,
          testEnvironment: plainProvider.credentials.testEnvironment,
        });
        // TODO setup properties of chat sender

        if (!result?.id) {
          await this.markCancelTask(task._id, inp.userId, inp.workflowId);
          return;
        }

        await this.markDoneTask(task._id, inp.userId, inp.workflowId);
      } catch (e) {
        // await this.sendErrorStatus(
        //   message,
        //   'error',
        //   'unexpected_sms_error',
        //   e.message || e.name || 'Un-expect SMS provider error',
        //   command,
        //   LogCodeEnum.SMS_ERROR,
        //   e,
        // );

        this.logger.error(e);
        await this.markCancelTask(task._id, inp.userId, inp.workflowId);
      }
    } catch (e) {
      this.logger.debug(e);
    }
  }

  private async executeEmail(
    provider: ProviderEntity,
    node: NodeEntity,
    inp: INextJob,
    members: MemberEntity[],
    variables: VariableEntity[],
  ) {
    if (!provider) {
      this.logger.error('Error missing providerId in node');
      return;
    }
    const mailFactory = new MailFactory();
    const data: INodeData = node.data;
    if (data.sender && data.subject && data.designHtml) {
      const mailHandler = mailFactory.getHandler(
        this.buildFactoryIntegration(provider),
        data.sender,
      );

      try {
        const task = await this.taskRepository.create({
          _userId: inp.userId,
          _environmentId: inp.environmentId,
          _organizationId: inp.organizationId,
          _workflowId: node._workflowId,
          workflowName: inp.workflowName,
          _nodeId: node._id,
          _providerId: provider._id,
          providerName: provider.name,
          payload: data,
          channel: provider.channel,
          code: 'TASK-' + makeid(8),
          name: provider.name,
          type: node.type,
          status: TaskStatus.in_process,
          priority: 'medium',
          email: inp.target.email,
          transactionId: inp.transactionId,
        });
        this.sendLogTaskTimeline(
          EventTypes['message.in_process'],
          inp.userId,
          task._id,
          inp.workflowId,
        );
        try {
          const html = transformContent(variables, data.designHtml, {
            ...inp.target,
            ...inp.overrides,
          });
          // const script = `<img src="http://localhost:5000/wolf/v1/events/email/tracking/${task._id}?type=message.link_clicked&tx_id=${task.transactionId}" alt="" style="display:none;"></img>`;
          // html = html.replace(/(<\s*\/\s*table)/, `${script}\n$1`);

          const result = await mailHandler.send({
            from: data.sender,
            to: [inp.target.email],
            html: html,
            subject: data.subject,
          });
          if (!result?.id) {
            await this.markCancelTask(task._id, inp.userId, inp.workflowId);
            throw new BadRequestException(
              'Error when send email. Check log task id: ' + task._id,
            );
          }
          await this.markDoneTask(task._id, inp.userId, inp.workflowId);

          await this.notificationService.create({
            userId: inp.userId,
            environmentId: provider._environmentId,
            organizationId: inp.organizationId,
            title: 'Trigger execute 2',
            description: 'Trigger execute',
          });
        } catch (e) {
          this.logger.error(e);
          await this.markCancelTask(task._id, inp.userId, inp.workflowId);
        }

        this.logger.verbose('Email message has been sent');
        // * send websocket
        await this.nextJob({
          workflowId: inp.workflowId,
          workflowName: inp.workflowName,
          orgId: inp.organizationId,
          envId: inp.environmentId,
          target: inp.target,
          overrides: inp.overrides,
          userId: inp.userId,
          type: node.type,
          previousNodeId: node._id,
          transactionId: inp.transactionId,
        });
      } catch (error) {
        // * send websocket error
        // TODO save log error
        // TODO update task status
        console.log(error);

        return;
      }
    } else {
      this.logger.error('Missing sender, subject, content of mail');
    }
  }

  public buildFactoryIntegration(
    integration: ProviderEntity,
    senderName?: string,
  ) {
    return {
      ...integration,
      credentials: {
        ...decryptCredentials(integration.credentials),
      },
      providerId: integration.providerId,
    };
  }

  async getTasks(
    u: IJwtPayload,
    payload: GetTaskRequestDto,
  ): Promise<TaskResponseDto> {
    return {
      page: payload.page,
      pageSize: payload.limit,
      totalCount: await this.taskRepository.count({
        _userId: u._id,
        _environmentId: u.environmentId,
        _organizationId: u.organizationId,
      }),
      data: await this.taskRepository.find(
        {
          _userId: u._id,
          _environmentId: u.environmentId,
          _organizationId: u.organizationId,
        },
        '_id _workflowId _userId _environmentId _organizationId workflowName _providerId providerName channel transactionId createdAt code name status priority',
        {
          skip: payload.page * payload.limit,
          limit: payload.limit,
          sort: { createdAt: -1 },
        },
      ),
    };
  }

  async delTask(u: IJwtPayload, code: string) {
    await this.taskRepository.delete({
      code: code,
      _userId: u._id,
    });
  }

  private sendLogTaskTimeline(
    type: EventTypes,
    userId: string,
    taskId: string,
    workflowId: string,
  ) {
    this.producerService.sendEvent<ITaskTimeline>(this.topicTaskTimeline, {
      type: type,
      createdAt: new Date(),
      data: {
        _userId: userId,
        _taskId: taskId,
        _workflowId: workflowId,
        createdBy: userId,
      },
    });
  }

  private async markDoneTask(
    taskId: string,
    userId: string,
    workflowId: string,
  ) {
    await this.taskRepository.updateStatus(
      taskId,
      TaskStatus.done,
      null,
      undefined,
    );

    this.sendLogTaskTimeline(
      EventTypes['message.done'],
      userId,
      taskId,
      workflowId,
    );
  }

  private async markCancelTask(
    taskId: string,
    userId: string,
    workflowId: string,
  ) {
    await this.taskRepository.updateStatus(
      taskId,
      TaskStatus.cancel,
      null,
      undefined,
    );

    this.sendLogTaskTimeline(
      EventTypes['message.cancel'],
      userId,
      taskId,
      workflowId,
    );
  }
}
