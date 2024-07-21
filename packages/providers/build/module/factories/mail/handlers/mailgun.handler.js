import { MailgunEmailProvider } from '@wolfxlabs/mailgun';
import { BaseHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class MailgunHandler extends BaseHandler {
    constructor() {
        super('mailgun', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            apiKey: credentials.apiKey,
            username: credentials.user,
            domain: credentials.domain,
            baseUrl: credentials.baseUrl,
            from: from,
        };
        this.provider = new MailgunEmailProvider(config);
    }
}
//# sourceMappingURL=mailgun.handler.js.map