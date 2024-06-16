import { ISubscription } from '@libs/repositories/subscription/types';
import { UserId } from '@libs/shared/types';

export class SubscriptionEntity implements ISubscription {
  _id?: string;
  channelId: string;
  _userId: UserId;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  locale?: string;
  overrides?: any;
  subscribed_at: Date;
  isOnline?: boolean;

  createdBy?: string;

  createdAt: Date;
}

export type SubscriptionDBModel = SubscriptionEntity;
