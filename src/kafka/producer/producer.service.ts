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
    brokers: [process.env.KAFKA_BROKER],
  });

  private readonly producer: Producer = this.kafka.producer({
    allowAutoTopicCreation: false,
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
