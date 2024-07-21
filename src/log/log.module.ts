import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { LogRepository } from '@libs/repositories/log';
import { SubscriberRepository } from '@libs/repositories/subscriber';
import { BillingRepository } from '@libs/repositories/billing';
import { TaskRepository } from '@libs/repositories/task';

@Module({
  providers: [
    LogService,
    LogRepository,
    TaskRepository,
    SubscriberRepository,
    BillingRepository,
  ],
  controllers: [LogController],
})
export class LogModule {}
