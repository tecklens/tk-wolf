import { MailersendEmailProvider } from '@wolf/mailersend';
import { BaseHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class MailerSendHandler extends BaseHandler {
    constructor() {
        super('mailersend', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        this.provider = new MailersendEmailProvider({
            apiKey: credentials.apiKey,
            from: from,
            senderName: credentials.senderName,
        });
    }
}
//# sourceMappingURL=mailersend.handler.js.map