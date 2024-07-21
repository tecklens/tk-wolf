import { ClicksendSmsProvider } from '@wolfxlabs/clicksend';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class ClicksendSmsHandler extends BaseSmsHandler {
    constructor() {
        super('clicksend', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        const config = {
            username: credentials.user,
            apiKey: credentials.apiKey,
        };
        this.provider = new ClicksendSmsProvider(config);
    }
}
//# sourceMappingURL=clicksend.handler.js.map