import { ChannelTypeEnum } from '../../entities';
export type ChannelId = string;
export declare enum StepTypeEnum {
    IN_APP = "in_app",
    EMAIL = "email",
    SMS = "sms",
    CHAT = "chat",
    PUSH = "push",
    DIGEST = "digest",
    TRIGGER = "trigger",
    DELAY = "delay"
}
export declare enum TemplateVariableTypeEnum {
    STRING = "String",
    ARRAY = "Array",
    BOOLEAN = "Boolean"
}
export declare const CHANNELS_WITH_PRIMARY: ChannelTypeEnum[];
