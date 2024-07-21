import { BaseSmsHandler } from './base.handler';
import { BrevoSmsProvider } from '@wolf/brevo-sms';
import { ChannelTypeEnum } from '@wolf/stateless';
export class BrevoSmsHandler extends BaseSmsHandler {
    constructor() {
        super('brevo-sms', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        if (!credentials.apiKey || !credentials.from) {
            throw Error('Invalid credentials');
        }
        const config = {
            apiKey: credentials.apiKey,
            from: credentials.from,
        };
        this.provider = new BrevoSmsProvider(config);
    }
}
//# sourceMappingURL=brevo-sms.handler.js.map