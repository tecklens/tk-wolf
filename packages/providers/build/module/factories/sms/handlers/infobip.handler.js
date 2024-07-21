import { InfobipSmsProvider } from '@wolf/infobip';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, SmsProviderIdEnum, } from '@wolf/stateless';
export class InfobipSmsHandler extends BaseSmsHandler {
    constructor() {
        super(SmsProviderIdEnum.Infobip, ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new InfobipSmsProvider({
            baseUrl: credentials.baseUrl,
            apiKey: credentials.apiKey,
            from: credentials.from,
        });
    }
}
//# sourceMappingURL=infobip.handler.js.map