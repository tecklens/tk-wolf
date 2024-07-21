"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickatellHandler = void 0;
const clickatell_1 = require("@wolfxlabs/clickatell");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolfxlabs/stateless");
class ClickatellHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('clickatell', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new clickatell_1.ClickatellSmsProvider({ apiKey: credentials.apiKey });
    }
}
exports.ClickatellHandler = ClickatellHandler;
//# sourceMappingURL=clickatell.handler.js.map