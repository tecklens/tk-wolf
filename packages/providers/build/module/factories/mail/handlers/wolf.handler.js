import { SendgridEmailProvider } from '@wolf/sendgrid';
import { BaseHandler } from './base.handler';
import { ChannelTypeEnum, EmailProviderIdEnum } from '@wolf/stateless';
export class WolfEmailHandler extends BaseHandler {
    constructor() {
        super(EmailProviderIdEnum.Novu, ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        this.provider = new SendgridEmailProvider({
            apiKey: credentials.apiKey,
            from,
            senderName: credentials.senderName,
            ipPoolName: credentials.ipPoolName,
        });
    }
}
//# sourceMappingURL=wolf.handler.js.map