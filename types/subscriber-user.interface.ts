import { CustomDataType } from '@tps/builder.types';

export interface ISubscriberJwt {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  subscriberId: string;
  organizationId: string;
  environmentId: string;
  aud: 'widget_user';
}

export type SubscriberCustomData = CustomDataType;

export interface ISubscriberPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  locale?: string;
  data?: SubscriberCustomData;
}

export interface ISubscribersDefine extends ISubscriberPayload {
  subscriberId: string;
}

export enum PreferenceOverrideSourceEnum {
  SUBSCRIBER = 'subscriber',
  TEMPLATE = 'template',
}
