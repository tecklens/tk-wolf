"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrafanaOnCallHandler = void 0;
const grafana_on_call_1 = require("@wolf/grafana-on-call");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class GrafanaOnCallHandler extends base_handler_1.BaseChatHandler {
    constructor() {
        super('grafana-on-call', stateless_1.ChannelTypeEnum.CHAT);
    }
    buildProvider(credentials) {
        this.provider = new grafana_on_call_1.GrafanaOnCallChatProvider(credentials);
    }
}
exports.GrafanaOnCallHandler = GrafanaOnCallHandler;
//# sourceMappingURL=grafana-on-call.handler.js.map