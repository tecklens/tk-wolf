import { TwilioSmsProvider } from '@wolfxlabs/twilio';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class TwilioHandler extends BaseSmsHandler {
    constructor() {
        super('twilio', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new TwilioSmsProvider({
            accountSid: credentials.accountSid,
            authToken: credentials.token,
            from: credentials.from,
        });
    }
}
//# sourceMappingURL=twilio.handler.js.map