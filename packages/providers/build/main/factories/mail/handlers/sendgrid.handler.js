"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendgridHandler = void 0;
const sendgrid_1 = require("@wolf/sendgrid");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class SendgridHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('sendgrid', stateless_1.ChannelTypeEnum.EMAIL);
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
exports.SendgridHandler = SendgridHandler;
//# sourceMappingURL=sendgrid.handler.js.map