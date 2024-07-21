"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailtrapHandler = void 0;
const mailtrap_1 = require("@wolfxlabs/mailtrap");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolfxlabs/stateless");
class MailtrapHandler extends base_handler_1.BaseHandler {
    constructor() {
        super(stateless_1.EmailProviderIdEnum.Mailtrap, stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            from: from,
            apiKey: credentials.apiKey,
        };
        this.provider = new mailtrap_1.MailtrapEmailProvider(config);
    }
}
exports.MailtrapHandler = MailtrapHandler;
//# sourceMappingURL=mailtrap.handler.js.map