export var EventTypes;
(function (EventTypes) {
    EventTypes["message.done"] = "message.done";
    EventTypes["message.in_process"] = "message.in_process";
    EventTypes["message.cancel"] = "message.cancel";
    EventTypes["message.bounced"] = "message.bounced";
    EventTypes["message.seen"] = "message.seen";
    EventTypes["message.unseen"] = "message.unseen";
    EventTypes["message.read"] = "message.read";
    EventTypes["message.unread"] = "message.unread";
    EventTypes["message.archived"] = "message.archived";
    EventTypes["message.unarchived"] = "message.unarchived";
    EventTypes["message.link_clicked"] = "message.link_clicked";
    EventTypes["workflow.updated"] = "workflow.updated";
})(EventTypes || (EventTypes = {}));
//# sourceMappingURL=event-types.enum.js.map