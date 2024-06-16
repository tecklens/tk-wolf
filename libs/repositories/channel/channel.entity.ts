import { UserId } from '@libs/shared/types';
import { ChannelId, IChannel } from '@libs/repositories/channel/types';

export class ChannelEntity implements IChannel {
  _id?: ChannelId;
  channelName: string;
  channelDescription: string;
  _organizationId: string;
  _userId: UserId;

  createdAt: Date;
}

export type ChannelDBModel = ChannelEntity;
