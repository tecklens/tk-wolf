"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RocketChatHandler = void 0;
const base_handler_1 = require("./base.handler");
const rocket_chat_1 = require("@wolf/rocket-chat");
const stateless_1 = require("@wolf/stateless");
class RocketChatHandler extends base_handler_1.BaseChatHandler {
    constructor() {
        super(stateless_1.ChatProviderIdEnum.RocketChat, stateless_1.ChannelTypeEnum.CHAT);
    }
    buildProvider(credentials) {
        const config = {
            token: credentials.token,
            user: credentials.user,
        };
        this.provider = new rocket_chat_1.RocketChatProvider(config);
    }
}
exports.RocketChatHandler = RocketChatHandler;
//# sourceMappingURL=rocket-chat.handler.js.map