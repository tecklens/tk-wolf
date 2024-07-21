import { BaseSmsHandler } from './base.handler';
import { BurstSmsProvider } from '@wolfxlabs/burst-sms';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
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