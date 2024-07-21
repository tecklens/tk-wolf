"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sms77Handler = void 0;
const sms77_1 = require("@wolf/sms77");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class Sms77Handler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('sms77', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new sms77_1.Sms77SmsProvider({
            apiKey: credentials.apiKey,
            from: credentials.from,
        });
    }
}
exports.Sms77Handler = Sms77Handler;
//# sourceMappingURL=sms77.handler.js.map