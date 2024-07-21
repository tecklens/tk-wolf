"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailFactory = void 0;
const handlers_1 = require("./handlers");
class MailFactory {
    constructor() {
        this.handlers = [
            new handlers_1.SendgridHandler(),
            new handlers_1.MailgunHandler(),
            new handlers_1.NetCoreHandler(),
            new handlers_1.MailjetHandler(),
            new handlers_1.MailtrapHandler(),
            new handlers_1.MandrillHandler(),
            new handlers_1.NodemailerHandler(),
            new handlers_1.PostmarkHandler(),
            new handlers_1.SendinblueHandler(),
            new handlers_1.SESHandler(),
            new handlers_1.InfobipEmailHandler(),
            new handlers_1.MailerSendHandler(),
            new handlers_1.Outlook365Handler(),
            new handlers_1.ResendHandler(),
            new handlers_1.PlunkHandler(),
            new handlers_1.SparkPostHandler(),
            new handlers_1.EmailWebhookHandler(),
            new handlers_1.WolfEmailHandler(),
            new handlers_1.BrazeEmailHandler(),
        ];
    }
    getHandler(integration, from) {
        const handler = this.handlers.find((handlerItem) => handlerItem.canHandle(integration.providerId, integration.channel)) ?? null;
        if (!handler)
            throw new Error('Handler for provider was not found');
        handler.buildProvider(integration.credentials, from);
        return handler;
    }
}
exports.MailFactory = MailFactory;
//# sourceMappingURL=mail.factory.js.map