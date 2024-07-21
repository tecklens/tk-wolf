import { UserId, IChannel, ChannelId } from '@wolf/stateless';

export class ChannelEntity implements IChannel {
  _id?: ChannelId;
  channelName: string;
  channelDescription: string;
  _organizationId: string;
  _userId: UserId;

  createdAt: Date;
}

export type ChannelDBModel = ChannelEntity;
