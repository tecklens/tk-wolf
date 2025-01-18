import { ChannelTypeEnum } from '@libs/provider/provider.interface';
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
export declare const STEP_TYPE_TO_CHANNEL_TYPE: Map<string, ChannelTypeEnum>;
export declare enum ChannelCTATypeEnum {
    REDIRECT = "redirect"
}
export declare enum TemplateVariableTypeEnum {
    STRING = "String",
    ARRAY = "Array",
    BOOLEAN = "Boolean"
}
export declare enum ActorTypeEnum {
    NONE = "none",
    USER = "user",
    SYSTEM_ICON = "system_icon",
    SYSTEM_CUSTOM = "system_custom"
}
export declare enum SystemAvatarIconEnum {
    WARNING = "warning",
    INFO = "info",
    ERROR = "error",
    SUCCESS = "success",
    UP = "up",
    QUESTION = "question"
}
export declare const CHANNELS_WITH_PRIMARY: ChannelTypeEnum[];
export declare const DELAYED_STEPS: StepTypeEnum[];
