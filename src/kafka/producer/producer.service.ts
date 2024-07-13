import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { IEventQueue } from '@libs/shared/types';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  // Connect to Kafka Server
  private readonly kafka = new Kafka({
    brokers: [`${process.env.KAFKA_BROKER}`],

    // ssl: true,
    // sasl: {
    //   mechanism: 'plain', // scram-sha-256 or scram-sha-512
    //   username: process.env.KAFKA_USER,
    //   password: process.env.KAFKA_PASS,
    // },
  });

  private readonly producer: Producer = this.kafka.producer({
    allowAutoTopicCreation: true,
    transactionTimeout: 30000,
  });

  async onModuleInit() {
    // Connect Producer on Module initialization
    await this.producer.connect();
  }

  sendEvent<T>(topic: string, data: IEventQueue<T>) {
    this.producer
      .send({
        topic: topic,
        acks: 1,
        timeout: 10000, //10s
        messages: [
          {
            value: JSON.stringify(data),
          },
        ],
      })
      .then((e) => {
        console.debug('send event to kafka');
      });
  }

  async produce(record: ProducerRecord) {
    //Send Records to Kafka to producer
    this.producer.send(record);
  }

  async onApplicationShutdown() {
    //Disconnect producer on Application ShutDown
    await this.producer.disconnect();
  }
}
