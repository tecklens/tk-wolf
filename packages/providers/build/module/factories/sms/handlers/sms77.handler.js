import { Sms77SmsProvider } from '@wolf/sms77';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class Sms77Handler extends BaseSmsHandler {
    constructor() {
        super('sms77', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new Sms77SmsProvider({
            apiKey: credentials.apiKey,
            from: credentials.from,
        });
    }
}
//# sourceMappingURL=sms77.handler.js.map