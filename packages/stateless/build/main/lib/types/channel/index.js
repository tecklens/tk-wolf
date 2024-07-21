"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHANNELS_WITH_PRIMARY = exports.TemplateVariableTypeEnum = exports.StepTypeEnum = void 0;
const entities_1 = require("../../entities");
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
var TemplateVariableTypeEnum;
(function (TemplateVariableTypeEnum) {
    TemplateVariableTypeEnum["STRING"] = "String";
    TemplateVariableTypeEnum["ARRAY"] = "Array";
    TemplateVariableTypeEnum["BOOLEAN"] = "Boolean";
})(TemplateVariableTypeEnum = exports.TemplateVariableTypeEnum || (exports.TemplateVariableTypeEnum = {}));
exports.CHANNELS_WITH_PRIMARY = [
    entities_1.ChannelTypeEnum.EMAIL,
    entities_1.ChannelTypeEnum.SMS,
];
//# sourceMappingURL=index.js.map