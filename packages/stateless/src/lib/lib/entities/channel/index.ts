import { ChannelId, OrganizationId, UserId } from '../../types';

export interface IChannel {
  _id?: ChannelId;
  channelName: string;
  channelDescription: string;

  _userId: UserId;
  _organizationId: OrganizationId;

  createdAt?: Date;
}
