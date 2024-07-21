"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MattermostHandler = void 0;
const base_handler_1 = require("./base.handler");
const mattermost_1 = require("@wolfxlabs/mattermost");
const stateless_1 = require("@wolfxlabs/stateless");
class MattermostHandler extends base_handler_1.BaseChatHandler {
    constructor() {
        super('mattermost', stateless_1.ChannelTypeEnum.CHAT);
    }
    buildProvider(_credentials) {
        this.provider = new mattermost_1.MattermostProvider();
    }
}
exports.MattermostHandler = MattermostHandler;
//# sourceMappingURL=mattermost.handler.js.map