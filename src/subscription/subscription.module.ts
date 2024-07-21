import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { ChannelRepository } from '@libs/repositories/channel';
import { SubscriberRepository } from '@libs/repositories/subscriber';
import { UserRateLimitRepository } from '@libs/repositories/user-rate-limit';

@Module({
  imports: [],
  providers: [
    SubscriptionService,
    ChannelRepository,
    SubscriberRepository,
    UserRateLimitRepository,
  ],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
