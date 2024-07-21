"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrevoSmsHandler = void 0;
const base_handler_1 = require("./base.handler");
const brevo_sms_1 = require("@wolfxlabs/brevo-sms");
const stateless_1 = require("@wolfxlabs/stateless");
class BrevoSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('brevo-sms', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        if (!credentials.apiKey || !credentials.from) {
            throw Error('Invalid credentials');
        }
        const config = {
            apiKey: credentials.apiKey,
            from: credentials.from,
        };
        this.provider = new brevo_sms_1.BrevoSmsProvider(config);
    }
}
exports.BrevoSmsHandler = BrevoSmsHandler;
//# sourceMappingURL=brevo-sms.handler.js.map