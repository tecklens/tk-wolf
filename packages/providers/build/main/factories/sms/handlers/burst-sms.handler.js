"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BurstSmsHandler = void 0;
const base_handler_1 = require("./base.handler");
const burst_sms_1 = require("@wolfxlabs/burst-sms");
const stateless_1 = require("@wolfxlabs/stateless");
class BurstSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('burst-sms', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new burst_sms_1.BurstSmsProvider({
            apiKey: credentials.apiKey,
            secretKey: credentials.secretKey,
        });
    }
}
exports.BurstSmsHandler = BurstSmsHandler;
//# sourceMappingURL=burst-sms.handler.js.map