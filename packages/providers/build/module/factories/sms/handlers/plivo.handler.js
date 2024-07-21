import { PlivoSmsProvider } from '@wolf/plivo';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class PlivoHandler extends BaseSmsHandler {
    constructor() {
        super('plivo', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new PlivoSmsProvider({
            accountSid: credentials.accountSid,
            authToken: credentials.token,
            from: credentials.from,
        });
    }
}
//# sourceMappingURL=plivo.handler.js.map