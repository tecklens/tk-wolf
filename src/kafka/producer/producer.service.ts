import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  // Connect to Kafka Server
  private readonly kafka = new Kafka({
    brokers: ['103.188.167.173:9092'],
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

  async produce(record: ProducerRecord) {
    //Send Records to Kafka to producer
    this.producer.send(record);
  }

  async onApplicationShutdown() {
    //Disconnect producer on Application ShutDown
    await this.producer.disconnect();
  }
}
