"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerSendHandler = void 0;
const mailersend_1 = require("@wolfxlabs/mailersend");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolfxlabs/stateless");
class MailerSendHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('mailersend', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        this.provider = new mailersend_1.MailersendEmailProvider({
            apiKey: credentials.apiKey,
            from: from,
            senderName: credentials.senderName,
        });
    }
}
exports.MailerSendHandler = MailerSendHandler;
//# sourceMappingURL=mailersend.handler.js.map