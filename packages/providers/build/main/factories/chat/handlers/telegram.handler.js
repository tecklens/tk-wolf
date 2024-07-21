"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramHandler = void 0;
const stateless_1 = require("@wolf/stateless");
const telegram_1 = require("@wolf/telegram");
const base_handler_1 = require("./base.handler");
class TelegramHandler extends base_handler_1.BaseChatHandler {
    constructor() {
        super('telegram', stateless_1.ChannelTypeEnum.CHAT);
    }
    buildProvider(_) {
        this.provider = new telegram_1.TelegramProvider();
    }
}
exports.TelegramHandler = TelegramHandler;
//# sourceMappingURL=telegram.handler.js.map