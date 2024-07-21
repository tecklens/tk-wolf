import { Module } from '@nestjs/common';
import { TriggerService } from './trigger.service';
import { TriggerController } from './trigger.controller';
import { KafkaModule } from '@app/kafka/kafka.module';
import { EventsModule } from '@app/events/events.module';
import { EventsGateway } from '@app/events/events.gateway';
import { JwtService } from '@nestjs/jwt';
import { NodeRepository } from '@libs/repositories/node';
import { EdgeRepository } from '@libs/repositories/edge';
import { TaskRepository } from '@libs/repositories/task';
import { ProviderRepository } from '@libs/repositories/provider';
import { WorkflowRepository } from '@libs/repositories/workflow';
import { MemberRepository } from '@libs/repositories/member';
import { TaskService } from '../../../tk-wolf-worker/src/task/task.service';
import { HttpModule } from '@nestjs/axios';
import { LogRepository } from '@libs/repositories/log';
import { VariableRepository } from '@libs/repositories/variable';
import { NotificationModule } from '@app/notification/notification.module';
import { NotificationService } from '@app/notification/notification.service';
import { NotificationRepository } from '@libs/repositories/notification';
import { TaskTimelineRepository } from '@libs/repositories/task-timeline';

@Module({
  imports: [
    KafkaModule,
    EventsModule,
    NotificationModule,
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 2,
    }),
  ],
  providers: [
    TriggerService,
    TaskService,
    EventsGateway,
    JwtService,
    NodeRepository,
    EdgeRepository,
    TaskRepository,
    ProviderRepository,
    WorkflowRepository,
    MemberRepository,
    LogRepository,
    VariableRepository,
    NotificationService,
    NotificationRepository,
    TaskTimelineRepository,
  ],
  controllers: [TriggerController],
})
export class TriggerModule {}
