import { GetSubscribersResponse } from '@app/subscription/dtos';
import { BaseRepository } from '../base-repository';
import { SubscriberDBModel, SubscriberEntity } from './subscriber.entity';
import { SubscriberSchema } from './subscriber.schema';

export class SubscriberRepository extends BaseRepository<
  SubscriberDBModel,
  SubscriberEntity,
  object
> {
  constructor() {
    super(SubscriberSchema, SubscriberEntity);
  }

  async findAllSubscribers(
    userId: string,
    skip: number,
    limit: number,
  ): Promise<GetSubscribersResponse> {
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
          data: [{ $skip: skip }, { $limit: limit }],
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

  async findSubscribersByChannel(
    userId: string,
    channelId: string,
    skip: number,
    limit: number,
  ): Promise<GetSubscribersResponse> {
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
          channelId: channelId,
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
          data: [{ $skip: skip }, { $limit: limit }],
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
