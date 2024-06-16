import { BaseRepository } from '../base-repository';
import { ChannelDBModel, ChannelEntity } from './channel.entity';
import { ChannelSchema } from '@libs/repositories/channel/channel.schema';

export class ChannelRepository extends BaseRepository<
  ChannelDBModel,
  ChannelEntity,
  object
> {
  constructor() {
    super(ChannelSchema, ChannelEntity);
  }

  async getChannel(userId: string, orgId: string, skip: number, limit: number) {
    return await this.find(
      {
        _userId: userId,
        _organizationId: orgId,
      },
      undefined,
      {
        skip: skip,
        limit: limit,
      },
    );
  }
}
