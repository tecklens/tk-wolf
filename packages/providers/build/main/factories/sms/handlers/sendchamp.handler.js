"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendchampSmsHandler = void 0;
const sendchamp_1 = require("@wolf/sendchamp");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class SendchampSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('sendchamp', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        if (!credentials.apiKey || !credentials.from) {
            throw Error('Invalid credentials');
        }
        const config = {
            apiKey: credentials.apiKey,
            from: credentials.from,
        };
        this.provider = new sendchamp_1.SendchampSmsProvider(config);
    }
}
exports.SendchampSmsHandler = SendchampSmsHandler;
//# sourceMappingURL=sendchamp.handler.js.map