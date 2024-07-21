"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SparkPostHandler = void 0;
const sparkpost_1 = require("@wolfxlabs/sparkpost");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolfxlabs/stateless");
class SparkPostHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('sparkpost', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            from: from,
            apiKey: credentials.apiKey,
            region: credentials.region,
            senderName: credentials.senderName,
        };
        this.provider = new sparkpost_1.SparkPostEmailProvider(config);
    }
}
exports.SparkPostHandler = SparkPostHandler;
//# sourceMappingURL=sparkpost.handler.js.map