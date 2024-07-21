import { ChannelTypeEnum } from '@stateless/lib/entities';

export type ChannelId = string;

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
export enum TemplateVariableTypeEnum {
  STRING = 'String',
  ARRAY = 'Array',
  BOOLEAN = 'Boolean',
}

export const CHANNELS_WITH_PRIMARY = [
  ChannelTypeEnum.EMAIL,
  ChannelTypeEnum.SMS,
];
