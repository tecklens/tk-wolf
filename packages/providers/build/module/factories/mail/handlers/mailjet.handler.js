import { ChannelTypeEnum } from '@wolfxlabs/stateless';
import { MailjetEmailProvider } from '@wolfxlabs/mailjet';
import { BaseHandler } from './base.handler';
export class MailjetHandler extends BaseHandler {
    constructor() {
        super('mailjet', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            from: from,
            apiKey: credentials.apiKey,
            apiSecret: credentials.secretKey,
            senderName: credentials.senderName,
        };
        this.provider = new MailjetEmailProvider(config);
    }
}
//# sourceMappingURL=mailjet.handler.js.map