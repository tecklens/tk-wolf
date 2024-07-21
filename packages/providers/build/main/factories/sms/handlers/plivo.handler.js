"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlivoHandler = void 0;
const plivo_1 = require("@wolf/plivo");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class PlivoHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('plivo', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new plivo_1.PlivoSmsProvider({
            accountSid: credentials.accountSid,
            authToken: credentials.token,
            from: credentials.from,
        });
    }
}
exports.PlivoHandler = PlivoHandler;
//# sourceMappingURL=plivo.handler.js.map