import {
  Injectable,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { SubscriptionRepository } from '@libs/repositories/subscription/subscription.repository';
import { IJwtPayload } from '@libs/shared/types';
import { CreateChannelRequest } from '@app/subscription/dtos/create-channel.request';
import { ChannelRepository } from '@libs/repositories/channel/channel.repository';
import { ISubscription } from '@libs/repositories/subscription/types';
import { CreateSubscriptionsRequest } from '@app/subscription/dtos/create-subscriptions.request';
import { UserRateLimitRepository } from '@libs/repositories/user-rate-limit/user-rate-limit.repository';
import { getRateLimitThresh, UserRateLimitPolicy } from '@libs/shared/consts';
import { GetSubscriptionsRequest } from '@app/subscription/dtos/get-subscriptions.request';
import { GetSubscriptionsResponse } from '@app/subscription/dtos/get-subscriptions.response';
import { DelSubscriptionRequest } from '@app/subscription/dtos/del-subscription.request';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly channelRepository: ChannelRepository,
    private readonly userRateLimitRepository: UserRateLimitRepository,
  ) {}

  async createChannel(user: IJwtPayload, payload: CreateChannelRequest) {
    const valid = await this.checkRateLimit(
      user._id,
      'channel',
      UserRateLimitPolicy.CHANNEL,
      getRateLimitThresh(user.plan).channel,
    );
    if (!valid) {
      throw new UnauthorizedException(
        'Exceeding the max channel for your Wolf account. Please upgrade pricing plan of you',
      );
    }
    const channel = await this.channelRepository.create({
      channelName: payload.channelName,
      channelDescription: payload.channelDescription,
      _userId: user._id,
      _organizationId: user.organizationId,
    });

    await this.userRateLimitRepository.increaseRequestCount(
      user._id,
      UserRateLimitPolicy.CHANNEL,
      'channel',
      1,
    );

    if (payload.targets?.length > 0) {
      const valid = await this.checkRateLimit(
        user._id,
        `subscription ${channel._id}`,
        UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL,
        getRateLimitThresh(user.plan).subscription_per_channel,
      );
      if (!valid) {
        throw new UnauthorizedException(
          'Exceeding the max channel for your Wolf account. Please upgrade pricing plan of you',
        );
      }
      await this.subscriptionRepository.insertMany(
        payload.targets.map(
          (e): ISubscription => ({
            channelId: channel._id,
            _userId: user._id,
            email: e.email,
            phone: e.phone,
            firstName: e.firstName,
            lastName: e.lastName,
            isOnline: false,
            locale: e.locale ?? 'en',
            subscribed_at: new Date(),
            overrides: e.overrides,
            createdBy: user._id,
          }),
        ),
      );

      await this.userRateLimitRepository.increaseRequestCount(
        user._id,
        UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL,
        `subscription ${channel}`,
        1,
      );
    }
  }

  async createSubscriptions(
    user: IJwtPayload,
    payload: CreateSubscriptionsRequest,
  ) {
    const channelId = payload.channel_id;
    if (!channelId) {
      throw new PreconditionFailedException('Channel Id is required');
    }
    const existChannel = await this.channelRepository.findOne({
      _userId: user._id,
      _id: channelId,
      _organizationId: user.organizationId,
    });

    if (!existChannel) {
      throw new PreconditionFailedException('Channel does not exist');
    }

    const valid = await this.checkRateLimit(
      user._id,
      `subscription ${channelId}`,
      UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL,
      getRateLimitThresh(user.plan).subscription_per_channel,
    );
    if (!valid) {
      throw new UnauthorizedException(
        'Exceeding the max channel for your Wolf account. Please upgrade pricing plan of you',
      );
    }

    const subscriptions = payload.targets;
    await this.subscriptionRepository.insertMany(
      subscriptions.map(
        (e): ISubscription => ({
          channelId: channelId,
          _userId: user._id,
          email: e.email,
          phone: e.phone,
          firstName: e.firstName,
          lastName: e.lastName,
          isOnline: false,
          locale: e.locale ?? 'en',
          subscribed_at: new Date(),
          overrides: e.overrides,
          createdBy: user._id,
        }),
      ),
    );
    await this.userRateLimitRepository.increaseRequestCount(
      user._id,
      UserRateLimitPolicy.SUBSCRIPTION_PER_CHANNEL,
      `subscription ${channelId}`,
      subscriptions.length,
    );
  }

  async getSubscriptions(
    user: IJwtPayload,
    channelId: string,
    payload: GetSubscriptionsRequest,
  ): Promise<GetSubscriptionsResponse> {
    const channel = await this.channelRepository.findOne({
      _userId: user._id,
      _organizationId: user.organizationId,
      _id: channelId,
    });

    if (!channel) {
      throw new PreconditionFailedException('Channel does not exist');
    }

    return await this.subscriptionRepository.findSubscriptionsByChannel(
      user._id,
      channelId,
      payload.page * payload.limit,
      payload.limit,
    );
  }

  async getAllSubscriptionOfUser(
    user: IJwtPayload,
    payload: GetSubscriptionsRequest,
  ): Promise<GetSubscriptionsResponse> {
    return await this.subscriptionRepository.findAllSubscriptions(
      user._id,
      payload.page * payload.page,
      payload.limit,
    );
  }

  async getChannels(user: IJwtPayload, payload: GetSubscriptionsRequest) {
    return await this.channelRepository.getChannel(
      user._id,
      user.organizationId,
      payload.page * payload.limit,
      payload.limit,
    );
  }

  async getChannel(user: IJwtPayload, channelId: string) {
    return await this.channelRepository.findOne({
      _id: channelId,
      _userId: user._id,
      _organizationId: user.organizationId,
    });
  }

  async delSubscription(user: IJwtPayload, payload: DelSubscriptionRequest) {
    const subs = this.subscriptionRepository.findOne({
      _userId: user._id,
      _id: payload.subscriptionId,
    });

    if (!subs) throw new PreconditionFailedException('Subscription not exist');

    await this.subscriptionRepository.delete({
      _userId: user._id,
      _id: payload.subscriptionId,
    });
  }

  private async checkRateLimit(
    userId: string,
    key: string,
    policyId: string,
    max: number,
  ) {
    let rateLimit = await this.userRateLimitRepository.findOne({
      _userId: userId,
      key: key,
      policyId: policyId,
    });

    if (!rateLimit) {
      rateLimit = await this.userRateLimitRepository.create({
        policyId: policyId,
        key: key,
        requestCount: 0,
        _userId: userId,
        windowStart: new Date(),
      });
    }

    return rateLimit.requestCount < max;
  }
}
