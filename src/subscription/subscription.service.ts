import {
  Injectable,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { SubscriberRepository } from '@libs/repositories/subscriber';
import { UserRateLimitRepository } from '@libs/repositories/user-rate-limit';
import { ChannelRepository } from '@libs/repositories/channel';
import {
  CreateChannelRequest,
  CreateSubscribersRequest,
  DelSubscriptionRequest,
  GetSubscribersRequest,
  GetSubscribersResponse,
} from './dtos';
import {
  IJwtPayload,
  UserRateLimitPolicy,
  getRateLimitThresh,
  ISubscriber,
} from '@wolf/stateless';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriberRepository,
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
          (e): ISubscriber => ({
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
    payload: CreateSubscribersRequest,
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
        (e): ISubscriber => ({
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
    payload: GetSubscribersRequest,
  ): Promise<GetSubscribersResponse> {
    const channel = await this.channelRepository.findOne({
      _userId: user._id,
      _organizationId: user.organizationId,
      _id: channelId,
    });

    if (!channel) {
      throw new PreconditionFailedException('Channel does not exist');
    }

    return await this.subscriptionRepository.findSubscribersByChannel(
      user._id,
      channelId,
      payload.page * payload.limit,
      payload.limit,
    );
  }

  async getAllSubscriptionOfUser(
    user: IJwtPayload,
    payload: GetSubscribersRequest,
  ): Promise<GetSubscribersResponse> {
    return await this.subscriptionRepository.findAllSubscribers(
      user._id,
      payload.page * payload.page,
      payload.limit,
    );
  }

  async getChannels(user: IJwtPayload, payload: GetSubscribersRequest) {
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
