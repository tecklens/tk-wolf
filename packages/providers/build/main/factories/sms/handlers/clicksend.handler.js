"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClicksendSmsHandler = void 0;
const clicksend_1 = require("@wolfxlabs/clicksend");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolfxlabs/stateless");
class ClicksendSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('clicksend', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        const config = {
            username: credentials.user,
            apiKey: credentials.apiKey,
        };
        this.provider = new clicksend_1.ClicksendSmsProvider(config);
    }
}
exports.ClicksendSmsHandler = ClicksendSmsHandler;
//# sourceMappingURL=clicksend.handler.js.map