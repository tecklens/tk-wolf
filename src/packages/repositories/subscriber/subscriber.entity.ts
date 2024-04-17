import { ExternalSubscriberId } from './types';
import type { OrganizationId } from '../organization';
import type { ChangePropsValueType, EnvironmentId } from '../environment';
import { ChatProviderIdEnum, PushProviderIdEnum } from '@config/provider.enum';

export class SubscriberEntity {
  // TODO: Use SubscriberId. Means lot of changes across whole codebase. Cool down.
  _id: string;

  firstName: string;

  lastName: string;

  email: string;

  phone?: string;

  avatar?: string;

  locale?: string;

  subscriberId: ExternalSubscriberId;

  channels?: IChannelSettings[];

  _organizationId: OrganizationId;

  _environmentId: EnvironmentId;

  deleted: boolean;

  createdAt: string;

  updatedAt: string;

  __v?: number;

  isOnline?: boolean;

  lastOnlineAt?: string;

  data?: any;
}

export type SubscriberDBModel = ChangePropsValueType<
  SubscriberEntity,
  '_environmentId' | '_organizationId'
>;

export class IChannelSettings {
  _integrationId: string;

  providerId: ChatProviderIdEnum | PushProviderIdEnum;

  credentials: IChannelCredentials;
}

export class IChannelCredentials {
  webhookUrl?: string;
  channel?: string;
  deviceTokens?: string[];
}
