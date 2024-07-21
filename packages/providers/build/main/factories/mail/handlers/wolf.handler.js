"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WolfEmailHandler = void 0;
const sendgrid_1 = require("@wolf/sendgrid");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class WolfEmailHandler extends base_handler_1.BaseHandler {
    constructor() {
        super(stateless_1.EmailProviderIdEnum.Novu, stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        this.provider = new sendgrid_1.SendgridEmailProvider({
            apiKey: credentials.apiKey,
            from,
            senderName: credentials.senderName,
            ipPoolName: credentials.ipPoolName,
        });
    }
}
exports.WolfEmailHandler = WolfEmailHandler;
//# sourceMappingURL=wolf.handler.js.map