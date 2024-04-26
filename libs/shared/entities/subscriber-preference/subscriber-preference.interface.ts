import { PreferenceOverrideSourceEnum } from '../../types';
import { IWfTrigger } from '../wf-template';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';

export interface IPreferenceChannels {
  email?: boolean;
  sms?: boolean;
  in_app?: boolean;
  chat?: boolean;
  push?: boolean;
}

export interface IPreferenceOverride {
  channel: ChannelTypeEnum;
  source: PreferenceOverrideSourceEnum;
}

export interface ISubscriberPreferenceResponse {
  template: ITemplateConfiguration;
  preference: IPreferenceResponse;
}

export interface IPreferenceResponse {
  enabled: boolean;
  channels: IPreferenceChannels;
  overrides: IPreferenceOverride[];
}

export interface ITemplateConfiguration {
  _id: string;
  name: string;
  critical: boolean;
  tags?: string[];
  triggers: IWfTrigger[];
}

export enum PreferenceLevelEnum {
  GLOBAL = 'global',
  TEMPLATE = 'template',
}

export interface IOverridePreferencesSources {
  [PreferenceOverrideSourceEnum.TEMPLATE]: IPreferenceChannels;
  [PreferenceOverrideSourceEnum.SUBSCRIBER]: IPreferenceChannels;
  [PreferenceOverrideSourceEnum.WORKFLOW_OVERRIDE]?: IPreferenceChannels;
}
