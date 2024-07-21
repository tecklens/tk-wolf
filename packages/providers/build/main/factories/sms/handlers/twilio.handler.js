"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioHandler = void 0;
const twilio_1 = require("@wolf/twilio");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class TwilioHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('twilio', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new twilio_1.TwilioSmsProvider({
            accountSid: credentials.accountSid,
            authToken: credentials.token,
            from: credentials.from,
        });
    }
}
exports.TwilioHandler = TwilioHandler;
//# sourceMappingURL=twilio.handler.js.map