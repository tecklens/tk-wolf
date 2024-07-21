"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureSmsHandler = void 0;
const azure_sms_1 = require("@wolf/azure-sms");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class AzureSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('azure-sms', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        if (!credentials.accessKey) {
            throw new Error('Access key is undefined');
        }
        const config = {
            connectionString: credentials.accessKey,
        };
        this.provider = new azure_sms_1.AzureSmsProvider(config);
    }
}
exports.AzureSmsHandler = AzureSmsHandler;
//# sourceMappingURL=azure-sms.handler.js.map