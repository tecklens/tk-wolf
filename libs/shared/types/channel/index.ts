import { ChannelTypeEnum } from '@libs/provider/provider.interface';

export enum StepTypeEnum {
  IN_APP = 'in_app',
  EMAIL = 'email',
  SMS = 'sms',
  CHAT = 'chat',
  PUSH = 'push',
  DIGEST = 'digest',
  TRIGGER = 'trigger',
  DELAY = 'delay',
}

export enum ChannelCTATypeEnum {
  REDIRECT = 'redirect',
}

export enum TemplateVariableTypeEnum {
  STRING = 'String',
  ARRAY = 'Array',
  BOOLEAN = 'Boolean',
}

export enum ActorTypeEnum {
  NONE = 'none',
  USER = 'user',
  SYSTEM_ICON = 'system_icon',
  SYSTEM_CUSTOM = 'system_custom',
}

export const CHANNELS_WITH_PRIMARY = [
  ChannelTypeEnum.EMAIL,
  ChannelTypeEnum.SMS,
];
