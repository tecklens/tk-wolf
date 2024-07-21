"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailgunHandler = void 0;
const mailgun_1 = require("@wolf/mailgun");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class MailgunHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('mailgun', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            apiKey: credentials.apiKey,
            username: credentials.user,
            domain: credentials.domain,
            baseUrl: credentials.baseUrl,
            from: from,
        };
        this.provider = new mailgun_1.MailgunEmailProvider(config);
    }
}
exports.MailgunHandler = MailgunHandler;
//# sourceMappingURL=mailgun.handler.js.map