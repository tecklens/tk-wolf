export class BasePushHandler {
    providerId;
    channelType;
    provider;
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
//# sourceMappingURL=base.handler.js.map