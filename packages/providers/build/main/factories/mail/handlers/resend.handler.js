"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendHandler = void 0;
const stateless_1 = require("@wolfxlabs/stateless");
const resend_1 = require("@wolfxlabs/resend");
const base_handler_1 = require("./base.handler");
class ResendHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('resend', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            from: from,
            apiKey: credentials.apiKey,
            senderName: credentials.senderName,
        };
        this.provider = new resend_1.ResendEmailProvider(config);
    }
}
exports.ResendHandler = ResendHandler;
//# sourceMappingURL=resend.handler.js.map