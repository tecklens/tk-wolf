import { OrganizationId, UserId } from '@libs/shared/types';

export type ChannelId = string;

export interface IChannel {
  _id?: ChannelId;
  channelName: string;
  channelDescription: string;

  _userId: UserId;
  _organizationId: OrganizationId;

  createdAt?: Date;
}
