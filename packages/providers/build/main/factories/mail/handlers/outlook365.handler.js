"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Outlook365Handler = void 0;
const stateless_1 = require("@wolf/stateless");
const outlook365_1 = require("@wolf/outlook365");
const base_handler_1 = require("./base.handler");
class Outlook365Handler extends base_handler_1.BaseHandler {
    constructor() {
        super('outlook365', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials) {
        const config = {
            from: credentials.from,
            senderName: credentials.senderName,
            password: credentials.password,
        };
        this.provider = new outlook365_1.Outlook365Provider(config);
    }
}
exports.Outlook365Handler = Outlook365Handler;
//# sourceMappingURL=outlook365.handler.js.map