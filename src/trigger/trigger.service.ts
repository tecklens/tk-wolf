import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
  PreconditionFailedException,
} from '@nestjs/common';
import { CreateTriggerResponse } from '@app/trigger/dtos/create-trigger.response';
import { CreateTriggerDto } from '@app/trigger/dtos/create-trigger.dto';
import { ProducerService } from '@app/kafka/producer/producer.service';
import { ConsumerService } from '@app/kafka/consumer/consumer.service';
import { NodeRepository } from '@libs/repositories/node/node.repository';
import { INextJob } from '@libs/shared/entities/workflow';
import { WorkflowRepository } from '@libs/repositories/workflow/workflow.repository';
import { WorkflowEntity } from '@libs/repositories/workflow/workflow.entity';
import { TaskService } from '@app/trigger/task.service';
import { LogRepository } from '@libs/repositories/log/log.repository';
import { IVariable } from '@libs/repositories/variable/types';
import { VariableRepository } from '@libs/repositories/variable/variable.repository';
import { get } from 'lodash';

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
    payload: CreateTriggerDto,
  ): Promise<CreateTriggerResponse> {
    const wf: WorkflowEntity = await this.workflowRepository.findById(
      payload.workflowId,
      '_id _organizationId _userId identifier name',
    );

    if (!wf) throw new NotFoundException('Workflow not found');

    const variables: IVariable[] = await this.variableRepository.findByWfId(
      wf._id,
    );

    await this.validateVariables(variables, payload);

    await this.logRepository.create({
      _userId: wf._userId,
      _organizationId: wf._organizationId,
      _environmentId: wf._environmentId,
      status: 1,
      event_type: 'create_trigger',
    });

    await this.taskService.nextJob(
      wf._id,
      wf.name,
      wf._organizationId,
      payload.target,
      payload.overrides,
      wf._userId,
      'starter',
      undefined,
    );
    return null;
  }

  async onInit() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this: TriggerService = this;
    const nextTopicDelay = `${process.env.KAFKA_PREFIX_JOB_TOPIC}.delay`;
    await this.consumerService.consume(
      {
        topics: [process.env.KAFKA_NEXT_JOB_TOPIC, nextTopicDelay],
      },
      {
        eachMessage: async ({ topic, partition, message }) => {
          if (topic === process.env.KAFKA_NEXT_JOB_TOPIC) {
            await _this.taskService.exeNextJob({
              topic,
              partition,
              message,
            });
          } else if (topic === nextTopicDelay) {
            const data: INextJob = JSON.parse(message.value.toString());
            if (data.workflowId && data.organizationId) {
              await _this.taskService.nextJob(
                data.workflowId,
                data.workflowName,
                data.organizationId,
                data.target,
                data.overrides,
                data.userId,
                'delay',
                data.currentNodeId,
              );
            }
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
}
