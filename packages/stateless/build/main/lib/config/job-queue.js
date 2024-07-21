"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobCronNameEnum = exports.ObservabilityBackgroundTransactionEnum = exports.JobTopicNameEnum = void 0;
var JobTopicNameEnum;
(function (JobTopicNameEnum) {
    JobTopicNameEnum["EXECUTION_LOG"] = "execution-logs";
    JobTopicNameEnum["ACTIVE_JOBS_METRIC"] = "metric-active-jobs";
    JobTopicNameEnum["INBOUND_PARSE_MAIL"] = "inbound-parse-mail";
    JobTopicNameEnum["STANDARD"] = "standard";
    JobTopicNameEnum["WEB_SOCKETS"] = "ws_socket_queue";
    JobTopicNameEnum["WORKFLOW"] = "trigger-handler";
    JobTopicNameEnum["PROCESS_SUBSCRIBER"] = "process-subscriber";
})(JobTopicNameEnum = exports.JobTopicNameEnum || (exports.JobTopicNameEnum = {}));
var ObservabilityBackgroundTransactionEnum;
(function (ObservabilityBackgroundTransactionEnum) {
    ObservabilityBackgroundTransactionEnum["JOB_PROCESSING_QUEUE"] = "job-processing-queue";
    ObservabilityBackgroundTransactionEnum["SUBSCRIBER_PROCESSING_QUEUE"] = "subscriber-processing-queue";
    ObservabilityBackgroundTransactionEnum["TRIGGER_HANDLER_QUEUE"] = "trigger-handler-queue";
    ObservabilityBackgroundTransactionEnum["EXECUTION_LOG_QUEUE"] = "execution-log-queue";
    ObservabilityBackgroundTransactionEnum["WS_SOCKET_QUEUE"] = "ws_socket_queue";
    ObservabilityBackgroundTransactionEnum["WS_SOCKET_SOCKET_CONNECTION"] = "ws_socket_handle_connection";
    ObservabilityBackgroundTransactionEnum["WS_SOCKET_HANDLE_DISCONNECT"] = "ws_socket_handle_disconnect";
    ObservabilityBackgroundTransactionEnum["CRON_JOB_QUEUE"] = "cron-job-queue";
})(ObservabilityBackgroundTransactionEnum = exports.ObservabilityBackgroundTransactionEnum || (exports.ObservabilityBackgroundTransactionEnum = {}));
var JobCronNameEnum;
(function (JobCronNameEnum) {
    JobCronNameEnum["SEND_CRON_METRICS"] = "send-cron-metrics";
    JobCronNameEnum["CREATE_BILLING_USAGE_RECORDS"] = "create-billing-usage-records";
})(JobCronNameEnum = exports.JobCronNameEnum || (exports.JobCronNameEnum = {}));
//# sourceMappingURL=job-queue.js.map