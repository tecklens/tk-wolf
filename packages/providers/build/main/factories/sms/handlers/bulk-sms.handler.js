"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkSmsHandler = void 0;
const bulk_sms_1 = require("@wolf/bulk-sms");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class BulkSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('bulk-sms', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        const config = {
            apiToken: credentials.apiToken,
        };
        this.provider = new bulk_sms_1.BulkSmsProvider(config);
    }
}
exports.BulkSmsHandler = BulkSmsHandler;
//# sourceMappingURL=bulk-sms.handler.js.map