import { TwilioSmsProvider } from '@wolfxlabs/twilio';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, SmsProviderIdEnum, } from '@wolfxlabs/stateless';
export class WolfSmsHandler extends BaseSmsHandler {
    constructor() {
        super(SmsProviderIdEnum.Novu, ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new TwilioSmsProvider({
            accountSid: credentials.accountSid,
            authToken: credentials.token,
            from: credentials.from,
        });
    }
}
//# sourceMappingURL=novu.handler.js.map