import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { LogRepository } from '@libs/repositories/log/log.repository';
import { SubscriptionRepository } from '@libs/repositories/subscription/subscription.repository';
import { BillingRepository } from '@libs/repositories/billing/billing.repository';
import { TaskRepository } from '@libs/repositories/task/task.repository';

@Module({
  providers: [
    LogService,
    LogRepository,
    TaskRepository,
    SubscriptionRepository,
    BillingRepository,
  ],
  controllers: [LogController],
})
export class LogModule {}
