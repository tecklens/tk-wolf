"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GupshupSmsHandler = void 0;
const base_handler_1 = require("./base.handler");
const gupshup_1 = require("@wolfxlabs/gupshup");
const stateless_1 = require("@wolfxlabs/stateless");
class GupshupSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('gupshup', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new gupshup_1.GupshupSmsProvider({
            userId: credentials.user,
            password: credentials.password,
        });
    }
}
exports.GupshupSmsHandler = GupshupSmsHandler;
//# sourceMappingURL=gupshup.handler.js.map