import { BaseHandler } from './base.handler';
import { EmailWebhookProvider } from '@wolf/email-webhook';
import { ChannelTypeEnum } from '@wolf/stateless';
export class EmailWebhookHandler extends BaseHandler {
    constructor() {
        super('email-webhook', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            from: credentials.from,
            webhookUrl: credentials.webhookUrl,
            hmacSecretKey: credentials.secretKey,
        };
        this.provider = new EmailWebhookProvider(config);
    }
}
//# sourceMappingURL=email-webhook.handler.js.map