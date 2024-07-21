"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISendSmsHandler = void 0;
const isend_sms_1 = require("@wolf/isend-sms");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class ISendSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('isend-sms', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        const config = {
            apiToken: credentials.apiToken ?? '',
            ...credentials,
        };
        this.provider = new isend_sms_1.ISendSmsProvider(config);
    }
}
exports.ISendSmsHandler = ISendSmsHandler;
//# sourceMappingURL=isend-sms.handler.js.map