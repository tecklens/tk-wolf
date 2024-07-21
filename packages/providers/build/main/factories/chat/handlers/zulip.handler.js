"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZulipHandler = void 0;
const base_handler_1 = require("./base.handler");
const zulip_1 = require("@wolf/zulip");
const stateless_1 = require("@wolf/stateless");
class ZulipHandler extends base_handler_1.BaseChatHandler {
    constructor() {
        super(stateless_1.ChatProviderIdEnum.Zulip, stateless_1.ChannelTypeEnum.CHAT);
    }
    buildProvider(_credentials) {
        this.provider = new zulip_1.ZulipProvider({});
    }
}
exports.ZulipHandler = ZulipHandler;
//# sourceMappingURL=zulip.handler.js.map