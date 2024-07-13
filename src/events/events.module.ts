import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { JwtService } from '@nestjs/jwt';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { KafkaModule } from '@app/kafka/kafka.module';
import { TaskRepository } from '@libs/repositories/task/task.repository';

@Module({
  imports: [KafkaModule],
  providers: [EventsGateway, JwtService, EventsService, TaskRepository],
  controllers: [EventsController],
})
export class EventsModule {}
