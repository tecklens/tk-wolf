"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnsHandler = void 0;
const sns_1 = require("@wolfxlabs/sns");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolfxlabs/stateless");
class SnsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('sns', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new sns_1.SNSSmsProvider({
            accessKeyId: credentials.apiKey,
            secretAccessKey: credentials.secretKey,
            region: credentials.region,
        });
    }
}
exports.SnsHandler = SnsHandler;
//# sourceMappingURL=sns.handler.js.map