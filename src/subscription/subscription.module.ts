import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { ChannelRepository } from '@libs/repositories/channel/channel.repository';
import { SubscriptionRepository } from '@libs/repositories/subscription/subscription.repository';
import { UserRateLimitRepository } from '@libs/repositories/user-rate-limit/user-rate-limit.repository';

@Module({
  imports: [],
  providers: [
    SubscriptionService,
    ChannelRepository,
    SubscriptionRepository,
    UserRateLimitRepository,
  ],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
