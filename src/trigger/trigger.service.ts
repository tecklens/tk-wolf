import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
  PreconditionFailedException,
} from '@nestjs/common';
import { ConsumerService } from '@app/kafka/consumer/consumer.service';
import { TaskService } from '@app/trigger/task.service';
import { get } from 'lodash';
import { getDateDataTimeout } from '@libs/utils';
import { v4 as uuidv4 } from 'uuid';
import { LogRepository } from '@libs/repositories/log';
import {
  WorkflowEntity,
  WorkflowRepository,
} from '@libs/repositories/workflow';
import { VariableRepository } from '@libs/repositories/variable';
import { IJwtPayload, ILogTrigger, INextJob, IVariable } from '@wolfxlabs/stateless';
import {
  CreateBulkTriggerDto,
  CreateTriggerDto,
  CreateTriggerResponse,
  GetLogTriggerRequestDto,
  GetLogTriggerResponseDto,
} from './dtos';

@Injectable()
export class TriggerService implements OnModuleInit {
  private logger = new Logger('TriggerService');

  constructor(
    private readonly consumerService: ConsumerService,
    private readonly logRepository: LogRepository,
    private readonly workflowRepository: WorkflowRepository,
    private readonly variableRepository: VariableRepository,
    private readonly taskService: TaskService,
  ) {
    this.onInit();
  }

  onModuleInit() {
    this.logger.log('init');
  }

  async createTrigger(
    user: IJwtPayload,
    payload: CreateTriggerDto,
  ): Promise<CreateTriggerResponse> {
    const wf: WorkflowEntity = await this.workflowRepository.findById(
      payload.workflowId,
      '_id _organizationId _environmentId _userId identifier name',
    );

    if (!wf) throw new NotFoundException('Workflow not found');

    const transactionId = uuidv4();

    const log: ILogTrigger = {
      _userId: wf._userId,
      _organizationId: wf._organizationId,
      _environmentId: wf._environmentId,

      _workflowId: wf._id,
      workflowName: wf.name,
      recipient: payload.target.email ?? payload.target.phone,

      status: 1,
      event_type: 'create_trigger',
      deletedAt: getDateDataTimeout(user.plan),
    };

    try {
      const variables: IVariable[] = await this.variableRepository.findByWfId(
        wf._id,
      );

      await this.validateVariables(variables, payload);

      await this.taskService.nextJob({
        workflowId: wf._id,
        workflowName: wf.name,
        orgId: wf._organizationId,
        envId: wf._environmentId,
        target: payload.target,
        overrides: payload.overrides,
        userId: wf._userId,
        type: 'starter',
        transactionId: transactionId,
        previousNodeId: undefined,
      });

      log.status = 1;
      await this.logRepository.create(log);
    } catch (e) {
      this.logger.error(e);
      log.status = 2;
      await this.logRepository.create(log);
      throw e;
    }

    return {
      transactionId: transactionId,
    };
  }

  async createBulkTrigger(
    user: IJwtPayload,
    payload: CreateBulkTriggerDto,
  ): Promise<CreateTriggerResponse> {
    const wf: WorkflowEntity = await this.workflowRepository.findById(
      payload.workflowId,
      '_id _organizationId _environmentId _userId identifier name',
    );

    if (!wf) throw new NotFoundException('Workflow not found');

    for (const target of payload.targets) {
      const transactionId = uuidv4();
      const log: ILogTrigger = {
        _userId: wf._userId,
        _organizationId: wf._organizationId,
        _environmentId: wf._environmentId,

        _workflowId: wf._id,
        workflowName: wf.name,
        recipient: target.email ?? target.phone,

        status: 1,
        event_type: 'create_trigger',
        deletedAt: getDateDataTimeout(user.plan),
      };

      try {
        const variables: IVariable[] = await this.variableRepository.findByWfId(
          wf._id,
        );

        await this.validateVariables(variables, {
          workflowId: payload.workflowId,
          target,
          overrides: payload.overrides,
        });

        await this.taskService.nextJob({
          workflowId: wf._id,
          workflowName: wf.name,
          orgId: wf._organizationId,
          envId: wf._environmentId,
          target: target,
          overrides: payload.overrides,
          userId: wf._userId,
          type: 'starter',
          previousNodeId: undefined,
          transactionId: transactionId,
        });

        log.status = 1;
      } catch (e) {
        this.logger.error(e);
        log.status = 2;
      }

      await this.logRepository.create(log);
    }
    return null;
  }

  async onInit() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this: TriggerService = this;
    const nextTopicDelay = `${process.env.KAFKA_PREFIX_JOB_TOPIC}.delay`;
    await this.consumerService.consume(
      {
        topics: [
          process.env.KAFKA_NEXT_JOB_TOPIC,
          process.env.KAFKA_LOG_TASK_TIMELINE,
          nextTopicDelay,
        ],
      },
      {
        eachBatchAutoResolve: true,
        eachBatch: async ({ batch, resolveOffset, heartbeat }) => {
          for (const message of batch.messages) {
            const topic = batch.topic,
              partition = batch.partition;
            if (topic === process.env.KAFKA_NEXT_JOB_TOPIC) {
              _this.taskService
                .exeNextJob({
                  topic,
                  partition,
                  message,
                })
                .then(() => {});
            } else if (topic === nextTopicDelay) {
              const data: INextJob = JSON.parse(message.value.toString());
              if (data.workflowId && data.organizationId) {
                _this.taskService
                  .nextJob({
                    workflowId: data.workflowId,
                    workflowName: data.workflowName,
                    orgId: data.organizationId,
                    envId: data.environmentId,
                    target: data.target,
                    overrides: data.overrides,
                    userId: data.userId,
                    type: 'delay',
                    previousNodeId: data.currentNodeId,
                    transactionId: data.transactionId,
                  })
                  .then(() => {});
              }
            } else if (topic === process.env.KAFKA_LOG_TASK_TIMELINE) {
              _this.taskService.saveTaskTimeline(message).then(() => {});
            }

            resolveOffset(message.offset);
            await heartbeat();
          }
        },
        autoCommitInterval: 500,
      },
    );
  }

  private async validateVariables(
    variables: IVariable[],
    payload: CreateTriggerDto,
  ) {
    const validateType = (v: IVariable, val: any) => {
      if (typeof val !== v.type) {
        throw new PreconditionFailedException({
          [v.name]: `${v.name} invalid type. Require type ${v.type}`,
        });
      }
    };

    for (const v of variables) {
      const val = get(payload.target, v.name);

      if (v.required && !val)
        throw new PreconditionFailedException({
          [v.name]: `${v.name} is required`,
        });
      else if (val) {
        validateType(v, val);
      }
    }

    return false;
  }

  async getLogTrigger(
    u: IJwtPayload,
    payload: GetLogTriggerRequestDto,
  ): Promise<GetLogTriggerResponseDto> {
    return {
      page: payload.page,
      pageSize: payload.limit,
      totalCount: await this.logRepository.count({
        _userId: u._id,
        _environmentId: u.environmentId,
        _organizationId: u.organizationId,
      }),
      data: await this.logRepository.find(
        {
          _userId: u._id,
          _environmentId: u.environmentId,
          _organizationId: u.organizationId,
        },
        undefined,
        {
          skip: payload.page * payload.limit,
          limit: payload.limit,
          sort: {
            createdAt: -1,
          },
        },
      ),
    };
  }

  async delLogTrigger(u: IJwtPayload, id: string) {
    this.logRepository.delete({
      _userId: u._id,
      _environmentId: u.environmentId,
      _organizationId: u.organizationId,
      _id: id,
    });
  }
}
