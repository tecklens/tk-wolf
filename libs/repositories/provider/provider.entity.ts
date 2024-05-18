import type { EnvironmentId } from '../environment';
import type { OrganizationId } from '../organization';
import { StepFilter } from '@libs/shared/dto/step-filter';
import { ChangePropsValueType } from '@tps/helpers';
import { ProviderId } from '@libs/repositories/provider/types';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import { ICredentials } from '@libs/shared/entities/integration';

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

  conditions?: StepFilter[];
}

export type ICredentialsEntity = ICredentials;

export type ProviderDBModel = ChangePropsValueType<
  ProviderEntity,
  '_environmentId' | '_organizationId'
>;
