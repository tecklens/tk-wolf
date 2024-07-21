"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsCentralHandler = void 0;
const base_handler_1 = require("./base.handler");
const sms_central_1 = require("@wolf/sms-central");
const stateless_1 = require("@wolf/stateless");
class SmsCentralHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('sms-central', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        if (!credentials.user || !credentials.password || !credentials.from) {
            throw Error('Invalid credentials');
        }
        const config = {
            username: credentials.user,
            password: credentials.password,
            from: credentials.from,
            baseUrl: credentials.baseUrl,
        };
        this.provider = new sms_central_1.SmsCentralSmsProvider(config);
    }
}
exports.SmsCentralHandler = SmsCentralHandler;
//# sourceMappingURL=sms-central.handler.js.map