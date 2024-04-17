import { Types } from 'mongoose';

import type { OrganizationId } from '../organization';

export type ChangePropsValueType<
  T,
  K extends keyof T,
  V = Types.ObjectId,
> = Omit<T, K> & {
  [P in K]: V;
};

export interface IApiKey {
  key: string;
  _userId: string;
}

export interface IWidgetSettings {
  notificationCenterEncryption: boolean;
}

export interface IDnsSettings {
  mxRecordConfigured: boolean;
  inboundParseDomain: string;
}

export class EnvironmentEntity {
  _id: string;

  name: string;

  _organizationId: OrganizationId;

  identifier: string;

  apiKeys: IApiKey[];

  widget: IWidgetSettings;

  dns?: IDnsSettings;

  _parentId: string;
}

export type EnvironmentDBModel = ChangePropsValueType<
  Omit<EnvironmentEntity, 'apiKeys'>,
  '_organizationId' | '_parentId'
> & {
  apiKeys: IApiKey & { _userId: Types.ObjectId }[];
};
