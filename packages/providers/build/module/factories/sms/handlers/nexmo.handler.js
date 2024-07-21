import { BaseSmsHandler } from './base.handler';
import { NexmoSmsProvider } from '@wolf/nexmo';
import { ChannelTypeEnum } from '@wolf/stateless';
export class NexmoHandler extends BaseSmsHandler {
    constructor() {
        super('nexmo', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new NexmoSmsProvider({
            apiKey: credentials.apiKey,
            from: credentials.from,
            apiSecret: credentials.secretKey,
        });
    }
}
//# sourceMappingURL=nexmo.handler.js.map