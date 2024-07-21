"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NexmoHandler = void 0;
const base_handler_1 = require("./base.handler");
const nexmo_1 = require("@wolfxlabs/nexmo");
const stateless_1 = require("@wolfxlabs/stateless");
class NexmoHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('nexmo', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new nexmo_1.NexmoSmsProvider({
            apiKey: credentials.apiKey,
            from: credentials.from,
            apiSecret: credentials.secretKey,
        });
    }
}
exports.NexmoHandler = NexmoHandler;
//# sourceMappingURL=nexmo.handler.js.map