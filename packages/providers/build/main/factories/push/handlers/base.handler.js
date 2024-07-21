"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePushHandler = void 0;
class BasePushHandler {
    constructor(providerId, channelType) {
        this.providerId = providerId;
        this.channelType = channelType;
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
exports.BasePushHandler = BasePushHandler;
//# sourceMappingURL=base.handler.js.map