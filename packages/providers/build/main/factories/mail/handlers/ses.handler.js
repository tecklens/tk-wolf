"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESHandler = void 0;
const stateless_1 = require("@wolfxlabs/stateless");
const ses_1 = require("@wolfxlabs/ses");
const base_handler_1 = require("./base.handler");
class SESHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('ses', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            region: credentials.region,
            accessKeyId: credentials.apiKey,
            secretAccessKey: credentials.secretKey,
            senderName: credentials.senderName ?? 'no-reply',
            from: from,
        };
        this.provider = new ses_1.SESEmailProvider(config);
    }
}
exports.SESHandler = SESHandler;
//# sourceMappingURL=ses.handler.js.map