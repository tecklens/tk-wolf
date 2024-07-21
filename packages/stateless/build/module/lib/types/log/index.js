export var LogStatusEnum;
(function (LogStatusEnum) {
    LogStatusEnum["ERROR"] = "error";
    LogStatusEnum["SUCCESS"] = "success";
    LogStatusEnum["INFO"] = "info";
})(LogStatusEnum || (LogStatusEnum = {}));
export var LogCodeEnum;
(function (LogCodeEnum) {
    LogCodeEnum[LogCodeEnum["TRIGGER_RECEIVED"] = 1000] = "TRIGGER_RECEIVED";
    LogCodeEnum[LogCodeEnum["TEMPLATE_NOT_ACTIVE"] = 1001] = "TEMPLATE_NOT_ACTIVE";
    LogCodeEnum[LogCodeEnum["TEMPLATE_NOT_FOUND"] = 1002] = "TEMPLATE_NOT_FOUND";
    LogCodeEnum[LogCodeEnum["SMS_ERROR"] = 1004] = "SMS_ERROR";
    LogCodeEnum[LogCodeEnum["CHAT_ERROR"] = 1005] = "CHAT_ERROR";
    LogCodeEnum[LogCodeEnum["MISSING_SMS_PROVIDER"] = 1006] = "MISSING_SMS_PROVIDER";
    LogCodeEnum[LogCodeEnum["IN_APP_MESSAGE_CREATED"] = 1007] = "IN_APP_MESSAGE_CREATED";
    LogCodeEnum[LogCodeEnum["MAIL_PROVIDER_DELIVERY_ERROR"] = 1008] = "MAIL_PROVIDER_DELIVERY_ERROR";
    LogCodeEnum[LogCodeEnum["TRIGGER_PROCESSED"] = 1009] = "TRIGGER_PROCESSED";
    LogCodeEnum[LogCodeEnum["PUSH_ERROR"] = 1010] = "PUSH_ERROR";
    LogCodeEnum[LogCodeEnum["MISSING_PUSH_PROVIDER"] = 1011] = "MISSING_PUSH_PROVIDER";
    LogCodeEnum[LogCodeEnum["SUBSCRIBER_NOT_FOUND"] = 3001] = "SUBSCRIBER_NOT_FOUND";
    LogCodeEnum[LogCodeEnum["SUBSCRIBER_MISSING_EMAIL"] = 3002] = "SUBSCRIBER_MISSING_EMAIL";
    LogCodeEnum[LogCodeEnum["SUBSCRIBER_MISSING_PHONE"] = 3003] = "SUBSCRIBER_MISSING_PHONE";
    LogCodeEnum[LogCodeEnum["SUBSCRIBER_MISSING_CHAT_CHANNEL_ID"] = 3006] = "SUBSCRIBER_MISSING_CHAT_CHANNEL_ID";
    LogCodeEnum[LogCodeEnum["SUBSCRIBER_ID_MISSING"] = 3004] = "SUBSCRIBER_ID_MISSING";
    LogCodeEnum[LogCodeEnum["MISSING_EMAIL_INTEGRATION"] = 3005] = "MISSING_EMAIL_INTEGRATION";
    LogCodeEnum[LogCodeEnum["MISSING_SMS_INTEGRATION"] = 3007] = "MISSING_SMS_INTEGRATION";
    LogCodeEnum[LogCodeEnum["MISSING_CHAT_INTEGRATION"] = 3008] = "MISSING_CHAT_INTEGRATION";
    LogCodeEnum[LogCodeEnum["MISSING_PUSH_INTEGRATION"] = 3009] = "MISSING_PUSH_INTEGRATION";
    LogCodeEnum[LogCodeEnum["SUBSCRIBER_MISSING_PUSH"] = 3010] = "SUBSCRIBER_MISSING_PUSH";
    LogCodeEnum[LogCodeEnum["MISSING_PAYLOAD_VARIABLE"] = 3011] = "MISSING_PAYLOAD_VARIABLE";
    LogCodeEnum[LogCodeEnum["AVATAR_ACTOR_ERROR"] = 3012] = "AVATAR_ACTOR_ERROR";
    LogCodeEnum[LogCodeEnum["SYNTAX_ERROR_IN_EMAIL_EDITOR"] = 3013] = "SYNTAX_ERROR_IN_EMAIL_EDITOR";
    LogCodeEnum[LogCodeEnum["TOPIC_ERROR"] = 4001] = "TOPIC_ERROR";
    LogCodeEnum[LogCodeEnum["TOPIC_SUBSCRIBERS_ERROR"] = 4002] = "TOPIC_SUBSCRIBERS_ERROR";
})(LogCodeEnum || (LogCodeEnum = {}));
//# sourceMappingURL=index.js.map