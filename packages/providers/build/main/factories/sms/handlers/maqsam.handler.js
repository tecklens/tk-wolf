"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaqsamHandler = void 0;
const maqsam_1 = require("@wolfxlabs/maqsam");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolfxlabs/stateless");
class MaqsamHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('maqsam', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new maqsam_1.MaqsamSmsProvider({
            accessKeyId: credentials.apiKey,
            accessSecret: credentials.secretKey,
            from: credentials.from,
        });
    }
}
exports.MaqsamHandler = MaqsamHandler;
//# sourceMappingURL=maqsam.handler.js.map