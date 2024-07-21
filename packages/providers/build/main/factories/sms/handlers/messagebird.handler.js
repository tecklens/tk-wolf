"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBirdHandler = void 0;
const messagebird_1 = require("@wolfxlabs/messagebird");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolfxlabs/stateless");
class MessageBirdHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('messagebird', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new messagebird_1.MessageBirdSmsProvider({
            access_key: credentials.accessKey,
        });
    }
}
exports.MessageBirdHandler = MessageBirdHandler;
//# sourceMappingURL=messagebird.handler.js.map