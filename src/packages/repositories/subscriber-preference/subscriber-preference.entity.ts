import type { ChangePropsValueType, EnvironmentId } from '../environment';
import type { OrganizationId } from '../organization';
import { IPreferenceChannels } from '@tps/subscriber-preference.interface';

export class SubscriberPreferenceEntity {
  _id: string;

  _organizationId: OrganizationId;

  _environmentId: EnvironmentId;

  _subscriberId: string;

  _templateId?: string;

  enabled: boolean;

  channels: IPreferenceChannels;

  level: PreferenceLevelEnum;
}

export type SubscriberPreferenceDBModel = ChangePropsValueType<
  SubscriberPreferenceEntity,
  '_environmentId' | '_organizationId' | '_subscriberId' | '_templateId'
>;

export enum PreferenceLevelEnum {
  GLOBAL = 'global',
  TEMPLATE = 'template',
}
