import {
  ChangePropsValueType,
  ChannelTypeEnum,
  EnvironmentId,
  ICredentials,
  OrganizationId,
  ProviderId,
} from '@wolf/stateless';

export class ProviderEntity {
  _id?: ProviderId;

  _environmentId: EnvironmentId;

  _organizationId: OrganizationId;

  providerId: string;

  channel: ChannelTypeEnum;

  credentials: ICredentialsEntity;

  active: boolean;

  name: string;

  identifier: string;

  priority?: number;

  primary: boolean;

  deleted?: boolean;

  deletedAt?: string;

  deletedBy?: string;
}

export type ICredentialsEntity = ICredentials;

export type ProviderDBModel = ChangePropsValueType<
  ProviderEntity,
  '_environmentId' | '_organizationId'
>;
