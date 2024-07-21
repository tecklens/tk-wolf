"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BandwidthHandler = void 0;
const bandwidth_1 = require("@wolf/bandwidth");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class BandwidthHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('bandwidth', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        const config = {
            username: credentials.user,
            password: credentials.password,
            accountId: credentials.accountSid,
        };
        this.provider = new bandwidth_1.BandwidthSmsProvider(config);
    }
}
exports.BandwidthHandler = BandwidthHandler;
//# sourceMappingURL=bandwidth.handler.js.map