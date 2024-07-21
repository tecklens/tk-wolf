import { BaseSmsHandler } from './base.handler';
import { BurstSmsProvider } from '@wolf/burst-sms';
import { ChannelTypeEnum } from '@wolf/stateless';
export class BurstSmsHandler extends BaseSmsHandler {
    constructor() {
        super('burst-sms', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new BurstSmsProvider({
            apiKey: credentials.apiKey,
            secretKey: credentials.secretKey,
        });
    }
}
//# sourceMappingURL=burst-sms.handler.js.map