import { ChannelId } from '@libs/repositories/channel/types';
import { UserId } from '@libs/shared/types';

export type SubscriptionId = string;

export interface ISubscription {
  _id?: SubscriptionId;
  channelId: ChannelId;
  _userId: UserId;

  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  locale?: string;
  overrides?: any;
  isOnline?: boolean;

  subscribed_at: Date;
  createdAt?: Date;
  createdBy?: string;
}
