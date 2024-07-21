"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WolfSmsHandler = void 0;
const twilio_1 = require("@wolfxlabs/twilio");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolfxlabs/stateless");
class WolfSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super(stateless_1.SmsProviderIdEnum.Novu, stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new twilio_1.TwilioSmsProvider({
            accountSid: credentials.accountSid,
            authToken: credentials.token,
            from: credentials.from,
        });
    }
}
exports.WolfSmsHandler = WolfSmsHandler;
//# sourceMappingURL=novu.handler.js.map