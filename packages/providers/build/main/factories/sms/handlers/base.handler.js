"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSmsHandler = void 0;
class BaseSmsHandler {
    constructor(providerId, channelType) {
        this.providerId = providerId;
        this.channelType = channelType;
    }
    getProvider() {
        return this.provider;
    }
    canHandle(providerId, channelType) {
        return providerId === this.providerId && channelType === this.channelType;
    }
    async send(options) {
        if (process.env.NODE_ENV === 'test') {
            throw new Error('Currently 3rd-party packages test are not support on test env');
        }
        return await this.provider.sendMessage(options);
    }
}
exports.BaseSmsHandler = BaseSmsHandler;
//# sourceMappingURL=base.handler.js.map