"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailWebhookHandler = void 0;
const base_handler_1 = require("./base.handler");
const email_webhook_1 = require("@wolf/email-webhook");
const stateless_1 = require("@wolf/stateless");
class EmailWebhookHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('email-webhook', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            from: credentials.from,
            webhookUrl: credentials.webhookUrl,
            hmacSecretKey: credentials.secretKey,
        };
        this.provider = new email_webhook_1.EmailWebhookProvider(config);
    }
}
exports.EmailWebhookHandler = EmailWebhookHandler;
//# sourceMappingURL=email-webhook.handler.js.map