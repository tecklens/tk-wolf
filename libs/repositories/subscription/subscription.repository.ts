import { BaseRepository } from '../base-repository';
import { SubscriptionDBModel, SubscriptionEntity } from './subscription.entity';
import { SubscriptionSchema } from '@libs/repositories/subscription/subscription.schema';
import { Types } from 'mongoose';
import { GetSubscriptionsResponse } from '@app/subscription/dtos/get-subscriptions.response';

export class SubscriptionRepository extends BaseRepository<
  SubscriptionDBModel,
  SubscriptionEntity,
  object
> {
  constructor() {
    super(SubscriptionSchema, SubscriptionEntity);
  }

  async findAllSubscriptions(
    userId: string,
    skip: number,
    limit: number,
  ): Promise<GetSubscriptionsResponse[]> {
    return await this.aggregate(
      [
        {
          $lookup: {
            from: 'channels',
            localField: 'channelId.str',
            foreignField: '_id.str',
            as: 'listChannel',
          },
        },
        {
          $set: {
            channelName: { $arrayElemAt: ['$listChannel.channelName', 0] },
          },
        },
        {
          $unset: 'listChannel',
        },
        {
          $match: {
            _userId: userId,
          },
        },
        {
          $set: {
            _id: {
              $toString: '$_id',
            },
          },
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
      ],
      {
        readPreference: 'secondaryPreferred',
      },
    );
  }
}
