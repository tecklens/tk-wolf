"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiretextSmsHandler = void 0;
const base_handler_1 = require("./base.handler");
const firetext_1 = require("@wolfxlabs/firetext");
const stateless_1 = require("@wolfxlabs/stateless");
class FiretextSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('firetext', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new firetext_1.FiretextSmsProvider({
            apiKey: credentials.apiKey,
            from: credentials.from,
        });
    }
}
exports.FiretextSmsHandler = FiretextSmsHandler;
//# sourceMappingURL=firetext.handler.js.map