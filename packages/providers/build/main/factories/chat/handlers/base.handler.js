"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseChatHandler = void 0;
class BaseChatHandler {
    constructor(providerId, channelType) {
        this.providerId = providerId;
        this.channelType = channelType;
    }
    canHandle(providerId, channelType) {
        return providerId === this.providerId && channelType === this.channelType;
    }
    async send(chatContent) {
        if (process.env.NODE_ENV === 'test') {
            return {};
        }
        return await this.provider.sendMessage(chatContent);
    }
}
exports.BaseChatHandler = BaseChatHandler;
//# sourceMappingURL=base.handler.js.map