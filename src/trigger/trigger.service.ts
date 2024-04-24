import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTriggerResponse } from '@app/trigger/dtos/create-trigger.response';
import { CreateTriggerDto } from '@app/trigger/dtos/create-trigger.dto';
import { ProducerService } from '@app/kafka/producer/producer.service';
import { ConsumerService } from '@app/kafka/consumer/consumer.service';
import { EventsGateway } from '@app/events/events.gateway';

@Injectable()
export class TriggerService implements OnModuleInit {
  constructor(
    private readonly sender: ProducerService,
    private readonly consumerService: ConsumerService,
    private readonly event: EventsGateway,
  ) {}

  async createTrigger(
    payload: CreateTriggerDto,
  ): Promise<CreateTriggerResponse> {
    this.sender.produce({
      messages: [
        {
          value: 'test',
        },
      ],
      topic: process.env.KAFKA_NEXT_JOB_TOPIC,
    });
    return null;
  }

  async onModuleInit() {
    await this.consumerService.consume(
      { topics: [process.env.KAFKA_NEXT_JOB_TOPIC] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          try {
            this.event.server.emit('event_662910acaae1bef4f768f988', {
              message: 'tt',
              event: 'message',
            });
          } catch (e) {
            console.log(e);
          }
          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          });
        },
      },
    );
  }
}
