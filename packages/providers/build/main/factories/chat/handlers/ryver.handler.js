"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RyverHandler = void 0;
const ryver_1 = require("@wolf/ryver");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class RyverHandler extends base_handler_1.BaseChatHandler {
    constructor() {
        super('ryver', stateless_1.ChannelTypeEnum.CHAT);
    }
    buildProvider(_credentials) {
        this.provider = new ryver_1.RyverChatProvider();
    }
}
exports.RyverHandler = RyverHandler;
//# sourceMappingURL=ryver.handler.js.map