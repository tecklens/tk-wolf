"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfobipSmsHandler = void 0;
const infobip_1 = require("@wolf/infobip");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class InfobipSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super(stateless_1.SmsProviderIdEnum.Infobip, stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new infobip_1.InfobipSmsProvider({
            baseUrl: credentials.baseUrl,
            apiKey: credentials.apiKey,
            from: credentials.from,
        });
    }
}
exports.InfobipSmsHandler = InfobipSmsHandler;
//# sourceMappingURL=infobip.handler.js.map