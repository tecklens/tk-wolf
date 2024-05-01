import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
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

@Injectable()
export class TriggerService implements OnModuleInit {
  private logger = new Logger('TriggerService');

  constructor(
    private readonly consumerService: ConsumerService,
    private readonly logRepository: LogRepository,
    private readonly workflowRepository: WorkflowRepository,
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
      '_organizationId _userId identifier name',
    );

    this.logRepository.create({
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
      payload.data,
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
                data.data,
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
}
