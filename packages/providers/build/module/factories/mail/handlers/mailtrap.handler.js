import { MailtrapEmailProvider } from '@wolfxlabs/mailtrap';
import { BaseHandler } from './base.handler';
import { ChannelTypeEnum, EmailProviderIdEnum } from '@wolfxlabs/stateless';
export class MailtrapHandler extends BaseHandler {
    constructor() {
        super(EmailProviderIdEnum.Mailtrap, ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            from: from,
            apiKey: credentials.apiKey,
        };
        this.provider = new MailtrapEmailProvider(config);
    }
}
//# sourceMappingURL=mailtrap.handler.js.map