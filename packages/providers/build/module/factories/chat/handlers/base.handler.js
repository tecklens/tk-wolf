export class BaseChatHandler {
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
    async send(chatContent) {
        if (process.env.NODE_ENV === 'test') {
            return {};
        }
        return await this.provider.sendMessage(chatContent);
    }
}
//# sourceMappingURL=base.handler.js.map