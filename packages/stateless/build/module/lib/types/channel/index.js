import { ChannelTypeEnum } from '@stateless/lib/entities';
export var StepTypeEnum;
(function (StepTypeEnum) {
    StepTypeEnum["IN_APP"] = "in_app";
    StepTypeEnum["EMAIL"] = "email";
    StepTypeEnum["SMS"] = "sms";
    StepTypeEnum["CHAT"] = "chat";
    StepTypeEnum["PUSH"] = "push";
    StepTypeEnum["DIGEST"] = "digest";
    StepTypeEnum["TRIGGER"] = "trigger";
    StepTypeEnum["DELAY"] = "delay";
})(StepTypeEnum || (StepTypeEnum = {}));
export var TemplateVariableTypeEnum;
(function (TemplateVariableTypeEnum) {
    TemplateVariableTypeEnum["STRING"] = "String";
    TemplateVariableTypeEnum["ARRAY"] = "Array";
    TemplateVariableTypeEnum["BOOLEAN"] = "Boolean";
})(TemplateVariableTypeEnum || (TemplateVariableTypeEnum = {}));
export const CHANNELS_WITH_PRIMARY = [
    ChannelTypeEnum.EMAIL,
    ChannelTypeEnum.SMS,
];
//# sourceMappingURL=index.js.map