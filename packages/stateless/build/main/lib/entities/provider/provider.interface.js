"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsEventStatusEnum = exports.EmailEventStatusEnum = exports.ChannelTypeEnum = void 0;
var ChannelTypeEnum;
(function (ChannelTypeEnum) {
    ChannelTypeEnum["EMAIL"] = "email";
    ChannelTypeEnum["IN_APP"] = "in_app";
    ChannelTypeEnum["SMS"] = "sms";
    ChannelTypeEnum["CHAT"] = "chat";
    ChannelTypeEnum["PUSH"] = "push";
    ChannelTypeEnum["WEBHOOK"] = "webhook";
    ChannelTypeEnum["DELAY"] = "delay";
})(ChannelTypeEnum = exports.ChannelTypeEnum || (exports.ChannelTypeEnum = {}));
var EmailEventStatusEnum;
(function (EmailEventStatusEnum) {
    EmailEventStatusEnum["OPENED"] = "opened";
    EmailEventStatusEnum["REJECTED"] = "rejected";
    EmailEventStatusEnum["SENT"] = "sent";
    EmailEventStatusEnum["DEFERRED"] = "deferred";
    EmailEventStatusEnum["DELIVERED"] = "delivered";
    EmailEventStatusEnum["BOUNCED"] = "bounced";
    EmailEventStatusEnum["DROPPED"] = "dropped";
    EmailEventStatusEnum["CLICKED"] = "clicked";
    EmailEventStatusEnum["BLOCKED"] = "blocked";
    EmailEventStatusEnum["SPAM"] = "spam";
    EmailEventStatusEnum["UNSUBSCRIBED"] = "unsubscribed";
    EmailEventStatusEnum["DELAYED"] = "delayed";
    EmailEventStatusEnum["COMPLAINT"] = "complaint";
})(EmailEventStatusEnum = exports.EmailEventStatusEnum || (exports.EmailEventStatusEnum = {}));
var SmsEventStatusEnum;
(function (SmsEventStatusEnum) {
    SmsEventStatusEnum["CREATED"] = "created";
    SmsEventStatusEnum["DELIVERED"] = "delivered";
    SmsEventStatusEnum["ACCEPTED"] = "accepted";
    SmsEventStatusEnum["QUEUED"] = "queued";
    SmsEventStatusEnum["SENDING"] = "sending";
    SmsEventStatusEnum["SENT"] = "sent";
    SmsEventStatusEnum["FAILED"] = "failed";
    SmsEventStatusEnum["UNDELIVERED"] = "undelivered";
    SmsEventStatusEnum["REJECTED"] = "rejected";
})(SmsEventStatusEnum = exports.SmsEventStatusEnum || (exports.SmsEventStatusEnum = {}));
//# sourceMappingURL=provider.interface.js.map