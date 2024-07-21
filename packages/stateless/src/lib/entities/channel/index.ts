import { ChannelId, OrganizationId, UserId } from '@stateless/lib/types';

export interface IChannel {
  _id?: ChannelId;
  channelName: string;
  channelDescription: string;

  _userId: UserId;
  _organizationId: OrganizationId;

  createdAt?: Date;
}
