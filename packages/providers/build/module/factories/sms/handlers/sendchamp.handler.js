import { SendchampSmsProvider } from '@wolfxlabs/sendchamp';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class SendchampSmsHandler extends BaseSmsHandler {
    constructor() {
        super('sendchamp', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        if (!credentials.apiKey || !credentials.from) {
            throw Error('Invalid credentials');
        }
        const config = {
            apiKey: credentials.apiKey,
            from: credentials.from,
        };
        this.provider = new SendchampSmsProvider(config);
    }
}
//# sourceMappingURL=sendchamp.handler.js.map