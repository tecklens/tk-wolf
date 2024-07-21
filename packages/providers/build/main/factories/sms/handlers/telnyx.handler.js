"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelnyxHandler = void 0;
const telnyx_1 = require("@wolfxlabs/telnyx");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolfxlabs/stateless");
class TelnyxHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('telnyx', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new telnyx_1.TelnyxSmsProvider({
            apiKey: credentials.apiKey,
            from: credentials.from,
            messageProfileId: credentials.messageProfileId,
        });
    }
}
exports.TelnyxHandler = TelnyxHandler;
//# sourceMappingURL=telnyx.handler.js.map