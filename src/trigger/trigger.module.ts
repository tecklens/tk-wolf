import { Module } from '@nestjs/common';
import { TriggerService } from './trigger.service';
import { TriggerController } from './trigger.controller';
import { KafkaModule } from '@app/kafka/kafka.module';
import { EventsModule } from '@app/events/events.module';
import { EventsGateway } from '@app/events/events.gateway';
import { JwtService } from '@nestjs/jwt';
import { NodeRepository } from '@libs/repositories/node/node.repository';
import { EdgeRepository } from '@libs/repositories/edge/edge.repository';
import { TaskRepository } from '@libs/repositories/task/task.repository';
import { ProviderRepository } from '@libs/repositories/provider';
import { WorkflowRepository } from '@libs/repositories/workflow/workflow.repository';
import { MemberRepository } from '@libs/repositories/member';
import { TaskService } from '@app/trigger/task.service';
import { HttpModule } from '@nestjs/axios';
import { LogRepository } from '@libs/repositories/log/log.repository';

@Module({
  imports: [
    KafkaModule,
    EventsModule,
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
  ],
  controllers: [TriggerController],
})
export class TriggerModule {}
