import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateTriggerResponse } from '@app/trigger/dtos/create-trigger.response';
import { CreateTriggerDto } from '@app/trigger/dtos/create-trigger.dto';
import { ProducerService } from '@app/kafka/producer/producer.service';
import { ConsumerService } from '@app/kafka/consumer/consumer.service';
import { EventsGateway } from '@app/events/events.gateway';
import { NodeRepository } from '@libs/repositories/node/node.repository';
import { WfNodeType } from '@libs/shared/entities/workflow/node.interface';
import { EdgeRepository } from '@libs/repositories/edge/edge.repository';
import { INextJob } from '@libs/shared/entities/workflow';

@Injectable()
export class TriggerService implements OnModuleInit {
  constructor(
    private readonly sender: ProducerService,
    private readonly consumerService: ConsumerService,
    private readonly event: EventsGateway,
    private nodeRepository: NodeRepository,
    private edgeRepository: EdgeRepository,
  ) {}

  async createTrigger(
    payload: CreateTriggerDto,
  ): Promise<CreateTriggerResponse> {
    const node = await this.nodeRepository.findOneByWorkflowIdAndType(
      payload.workflowId,
      WfNodeType.starter,
    );

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
          ...payload,
        };

        this.sender.produce({
          messages: [
            {
              value: JSON.stringify(dataTransfer),
            },
          ],
          topic: `${process.env.KAFKA_PREFIX_JOB_TOPIC}.${n.type}`,
        });
      }
    }
    return null;
  }

  async onModuleInit() {
    console.log(
      Object.values(WfNodeType).map(
        (e) => `${process.env.KAFKA_PREFIX_JOB_TOPIC}.${e}`,
      ),
    );
    await Promise.all([
      this.consumerService.consume(
        {
          topics: Object.values(WfNodeType).map(
            (e) => `${process.env.KAFKA_PREFIX_JOB_TOPIC}.${e}`,
          ),
        },
        {
          eachMessage: async ({ topic, partition, message }) => {
            console.log({
              value: message.value.toString(),
              topic: topic.toString(),
              partition: partition.toString(),
            });
          },
          autoCommitInterval: 500,
        },
      ),
    ]);
  }
}
