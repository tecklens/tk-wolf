import { PushWebhookPushProvider } from '@wolfxlabs/push-webhook';
import { BasePushHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class PushWebhookHandler extends BasePushHandler {
    constructor() {
        super('push-webhook', ChannelTypeEnum.PUSH);
    }
    buildProvider(credentials) {
        if (!credentials.webhookUrl || !credentials.secretKey) {
            throw Error('Config is not valid for push-webhook provider');
        }
        this.provider = new PushWebhookPushProvider({
            webhookUrl: credentials.webhookUrl,
            hmacSecretKey: credentials.secretKey,
        });
    }
}
//# sourceMappingURL=push-webhook.handler.js.map