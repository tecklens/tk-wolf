"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushWebhookHandler = void 0;
const push_webhook_1 = require("@wolf/push-webhook");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class PushWebhookHandler extends base_handler_1.BasePushHandler {
    constructor() {
        super('push-webhook', stateless_1.ChannelTypeEnum.PUSH);
    }
    buildProvider(credentials) {
        if (!credentials.webhookUrl || !credentials.secretKey) {
            throw Error('Config is not valid for push-webhook provider');
        }
        this.provider = new push_webhook_1.PushWebhookPushProvider({
            webhookUrl: credentials.webhookUrl,
            hmacSecretKey: credentials.secretKey,
        });
    }
}
exports.PushWebhookHandler = PushWebhookHandler;
//# sourceMappingURL=push-webhook.handler.js.map