"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackHandler = void 0;
const stateless_1 = require("@wolf/stateless");
const slack_1 = require("@wolf/slack");
const base_handler_1 = require("./base.handler");
class SlackHandler extends base_handler_1.BaseChatHandler {
    constructor() {
        super('slack', stateless_1.ChannelTypeEnum.CHAT);
    }
    buildProvider(_) {
        this.provider = new slack_1.SlackProvider();
    }
}
exports.SlackHandler = SlackHandler;
//# sourceMappingURL=slack.handler.js.map