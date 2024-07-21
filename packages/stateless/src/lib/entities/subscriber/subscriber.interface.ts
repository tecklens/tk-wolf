import { ChatProviderIdEnum, PushProviderIdEnum } from '../../consts';
import { ChannelId, SubscriberId, UserId } from '../../types';

export interface ISubscriber {
  _id?: SubscriberId;
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

export interface IChannelSettings {
  _integrationId: string;
  providerId: ChatProviderIdEnum | PushProviderIdEnum;
  credentials: IChannelCredentials;
}

export interface IChannelCredentials {
  webhookUrl?: string;
  deviceTokens?: string[];
}
