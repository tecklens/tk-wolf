"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELAYED_STEPS = exports.CHANNELS_WITH_PRIMARY = exports.SystemAvatarIconEnum = exports.ActorTypeEnum = exports.TemplateVariableTypeEnum = exports.ChannelCTATypeEnum = exports.STEP_TYPE_TO_CHANNEL_TYPE = exports.StepTypeEnum = void 0;
const provider_interface_1 = require("@libs/provider/provider.interface");
var StepTypeEnum;
(function (StepTypeEnum) {
    StepTypeEnum["IN_APP"] = "in_app";
    StepTypeEnum["EMAIL"] = "email";
    StepTypeEnum["SMS"] = "sms";
    StepTypeEnum["CHAT"] = "chat";
    StepTypeEnum["PUSH"] = "push";
    StepTypeEnum["DIGEST"] = "digest";
    StepTypeEnum["TRIGGER"] = "trigger";
    StepTypeEnum["DELAY"] = "delay";
})(StepTypeEnum = exports.StepTypeEnum || (exports.StepTypeEnum = {}));
exports.STEP_TYPE_TO_CHANNEL_TYPE = new Map([
    [StepTypeEnum.IN_APP, provider_interface_1.ChannelTypeEnum.IN_APP],
    [StepTypeEnum.EMAIL, provider_interface_1.ChannelTypeEnum.EMAIL],
    [StepTypeEnum.SMS, provider_interface_1.ChannelTypeEnum.SMS],
    [StepTypeEnum.CHAT, provider_interface_1.ChannelTypeEnum.CHAT],
    [StepTypeEnum.PUSH, provider_interface_1.ChannelTypeEnum.PUSH],
]);
var ChannelCTATypeEnum;
(function (ChannelCTATypeEnum) {
    ChannelCTATypeEnum["REDIRECT"] = "redirect";
})(ChannelCTATypeEnum = exports.ChannelCTATypeEnum || (exports.ChannelCTATypeEnum = {}));
var TemplateVariableTypeEnum;
(function (TemplateVariableTypeEnum) {
    TemplateVariableTypeEnum["STRING"] = "String";
    TemplateVariableTypeEnum["ARRAY"] = "Array";
    TemplateVariableTypeEnum["BOOLEAN"] = "Boolean";
})(TemplateVariableTypeEnum = exports.TemplateVariableTypeEnum || (exports.TemplateVariableTypeEnum = {}));
var ActorTypeEnum;
(function (ActorTypeEnum) {
    ActorTypeEnum["NONE"] = "none";
    ActorTypeEnum["USER"] = "user";
    ActorTypeEnum["SYSTEM_ICON"] = "system_icon";
    ActorTypeEnum["SYSTEM_CUSTOM"] = "system_custom";
})(ActorTypeEnum = exports.ActorTypeEnum || (exports.ActorTypeEnum = {}));
var SystemAvatarIconEnum;
(function (SystemAvatarIconEnum) {
    SystemAvatarIconEnum["WARNING"] = "warning";
    SystemAvatarIconEnum["INFO"] = "info";
    SystemAvatarIconEnum["ERROR"] = "error";
    SystemAvatarIconEnum["SUCCESS"] = "success";
    SystemAvatarIconEnum["UP"] = "up";
    SystemAvatarIconEnum["QUESTION"] = "question";
})(SystemAvatarIconEnum = exports.SystemAvatarIconEnum || (exports.SystemAvatarIconEnum = {}));
exports.CHANNELS_WITH_PRIMARY = [
    provider_interface_1.ChannelTypeEnum.EMAIL,
    provider_interface_1.ChannelTypeEnum.SMS,
];
exports.DELAYED_STEPS = [StepTypeEnum.DELAY, StepTypeEnum.DIGEST];
//# sourceMappingURL=index.js.map