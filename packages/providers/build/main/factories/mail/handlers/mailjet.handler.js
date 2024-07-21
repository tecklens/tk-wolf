"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailjetHandler = void 0;
const stateless_1 = require("@wolfxlabs/stateless");
const mailjet_1 = require("@wolfxlabs/mailjet");
const base_handler_1 = require("./base.handler");
class MailjetHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('mailjet', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            from: from,
            apiKey: credentials.apiKey,
            apiSecret: credentials.secretKey,
            senderName: credentials.senderName,
        };
        this.provider = new mailjet_1.MailjetEmailProvider(config);
    }
}
exports.MailjetHandler = MailjetHandler;
//# sourceMappingURL=mailjet.handler.js.map