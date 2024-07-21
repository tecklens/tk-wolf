"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendinblueHandler = void 0;
const stateless_1 = require("@wolfxlabs/stateless");
const sendinblue_1 = require("@wolfxlabs/sendinblue");
const base_handler_1 = require("./base.handler");
class SendinblueHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('sendinblue', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            apiKey: credentials.apiKey,
            from: from,
            senderName: credentials.senderName,
        };
        this.provider = new sendinblue_1.BrevoEmailProvider(config);
    }
}
exports.SendinblueHandler = SendinblueHandler;
//# sourceMappingURL=sendinblue.handler.js.map