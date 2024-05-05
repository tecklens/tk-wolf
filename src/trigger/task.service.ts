import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  IOverridesDataTrigger,
  ITargetTrigger,
} from '@app/trigger/dtos/create-trigger.dto';
import { ProducerService } from '@app/kafka/producer/producer.service';
import { EventsGateway } from '@app/events/events.gateway';
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
import { MailFactory, SmsFactory } from '@app/provider/factories';
import { NodeEntity } from '@libs/repositories/node/node.entity';
import { INodeData } from '@tps/i-node.data';
import { makeid } from '@libs/utils';
import { TaskStatus } from '@tps/task.interface';
import { MemberEntity, MemberRepository } from '@libs/repositories/member';
import { GetTaskRequestDto } from '@app/trigger/dtos/get-task.request';
import { TaskResponseDto } from '@app/trigger/dtos/get-task.response.dto';
import { HttpService } from '@nestjs/axios';
import { PlatformException } from '@pak/utils/exceptions';
import { get } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  private logger = new Logger('TaskService');

  constructor(
    private readonly sender: ProducerService,
    private readonly event: EventsGateway,
    private readonly nodeRepository: NodeRepository,
    private readonly edgeRepository: EdgeRepository,
    private readonly taskRepository: TaskRepository,
    private readonly providerRepository: ProviderRepository,
    private readonly memberRepository: MemberRepository,
    private readonly httpService: HttpService,
  ) {}

  async nextJob(
    workflowId: string,
    workflowName: string,
    orgId: string,
    target: ITargetTrigger,
    overrides: IOverridesDataTrigger,
    userId: string,
    type: string,
    previousNodeId: string | undefined,
  ) {
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
          target: target,
          workflowId,
          workflowName,
          userId,
          overrides: overrides,
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
          this.logger.log('Not members in workflwo org');
        }

        switch (node.type) {
          case ChannelTypeEnum.EMAIL:
            await this.executeEmail(provider, node, data, members);
            break;
          case ChannelTypeEnum.DELAY:
            await this.executeDelay(node.data, strData, data.userId);
            break;
          case ChannelTypeEnum.WEBHOOK:
            await this.executeWebhook(node, data);
            break;
          case ChannelTypeEnum.SMS:
            await this.executeSms(provider, node, data, members);
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
      this.sender.produce({
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
        subscriberId: inp.target.subcriberId,
        email: inp.target.email,
      });

      const dataSend: IWebhookData = {
        _workflowId: inp.workflowId,
        _userId: inp.userId,
        requestData: inp,
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
        this.taskRepository.updateStatus(task._id, TaskStatus.cancel, e, null);
      }
    }
  }

  private async executeSms(
    provider: ProviderEntity,
    node: NodeEntity,
    inp: INextJob,
    members: MemberEntity[],
    overrides: Record<string, any> = {},
  ) {
    const task = await this.taskRepository.create({
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
      subscriberId: inp.target.subcriberId,
      email: inp.target.email,
      phone: inp.target.phone,
    });
    try {
      const overrides = inp.overrides;

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
        to: overrides.to || inp.target.phone,
        from: overrides.from || provider.credentials.from,
        content: overrides.content || get(node.data, 'content'),
        id: uuidv4(),
        customData: overrides.customData || {},
      });

      // await this.executionLogRoute.execute(
      //   ExecutionLogRouteCommand.create({
      //     ...ExecutionLogRouteCommand.getDetailsFromJob(command.job),
      //     messageId: message._id,
      //     detail: DetailEnum.MESSAGE_SENT,
      //     source: ExecutionDetailsSourceEnum.INTERNAL,
      //     status: ExecutionDetailsStatusEnum.SUCCESS,
      //     isTest: false,
      //     isRetry: false,
      //     raw: JSON.stringify(result),
      //   }),
      // );

      if (!result?.id) {
        return;
      }

      // await this.messageRepository.update(
      //   { _environmentId: command.environmentId, _id: message._id },
      //   {
      //     $set: {
      //       identifier: result.id,
      //     },
      //   },
      // );

      await this.taskRepository.updateStatus(
        task._id,
        TaskStatus.done,
        null,
        undefined,
      );
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
      await this.taskRepository.updateStatus(
        task._id,
        TaskStatus.cancel,
        e,
        undefined,
      );
    }
  }

  private async executeEmail(
    provider: ProviderEntity,
    node: NodeEntity,
    inp: INextJob,
    members: MemberEntity[],
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
          subscriberId: inp.target.subcriberId,
          email: inp.target.email,
        });
        // this.emitEventToMembers(members, {
        //   type: 'task',
        //   data: task,
        // });
        try {
          const result = await mailHandler.send({
            from: data.sender,
            to: [inp.target.email],
            html: data.designHtml,
            subject: data.subject,
          });
          if (!result?.id) {
            throw new BadRequestException(
              'Error when send email. Check log task id: ' + task._id,
            );
          }
          await this.taskRepository.updateStatus(
            task._id,
            TaskStatus.done,
            null,
            undefined,
          );
        } catch (e) {
          this.logger.error(e);
          await this.taskRepository.updateStatus(
            task._id,
            TaskStatus.cancel,
            e,
            undefined,
          );
        }

        this.logger.verbose('Email message has been sent');
        // * send websocket
        await this.nextJob(
          inp.workflowId,
          inp.workflowName,
          inp.organizationId,
          inp.target,
          inp.overrides,
          inp.userId,
          node.type,
          node._id,
        );
      } catch (error) {
        // * send websocket error
        // TODO save log error
        // TODO update task status

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
        ...integration.credentials,
      },
      providerId: integration.providerId,
    };
  }

  emitEventToMembers(members: MemberEntity[], data: any) {
    for (const member of members) {
      this.event.server.emit(`event_${member._userId}`, data);
    }
  }

  async getTasks(payload: GetTaskRequestDto): Promise<TaskResponseDto> {
    return {
      page: payload.page,
      pageSize: payload.limit,
      totalCount: await this.taskRepository.count({}),
      data: await this.taskRepository.find({}, '', {
        skip: payload.page * payload.limit,
        limit: payload.limit,
        sort: { createdAt: -1 },
      }),
    };
  }
}
