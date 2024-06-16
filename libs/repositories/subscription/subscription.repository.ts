import { BaseRepository } from '../base-repository';
import { SubscriptionDBModel, SubscriptionEntity } from './subscription.entity';
import { SubscriptionSchema } from '@libs/repositories/subscription/subscription.schema';
import { Types } from 'mongoose';
import { GetSubscriptionResponse } from '@app/subscription/dtos/get-subscription.response';
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
  ): Promise<GetSubscriptionsResponse> {
    const query = [
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
      {
        $facet: {
          data: [{ $skip: 0 }, { $limit: 10 }],
          total: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ];
    const rsp = await this.aggregate(query, {
      readPreference: 'secondaryPreferred',
    });

    if (rsp.length > 0) {
      return {
        data: rsp[0].data,
        total: rsp[0].total[0]?.count,
      };
    } else {
      return {
        data: [],
        total: 0,
      };
    }
  }
}
