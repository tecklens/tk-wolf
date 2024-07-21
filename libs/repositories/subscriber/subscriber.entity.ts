import { ISubscriber, UserId } from '@wolfxlabs/stateless';

export class SubscriberEntity implements ISubscriber {
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

export type SubscriberDBModel = SubscriberEntity;
