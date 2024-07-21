"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MandrillHandler = void 0;
const stateless_1 = require("@wolf/stateless");
const mandrill_1 = require("@wolf/mandrill");
const base_handler_1 = require("./base.handler");
class MandrillHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('mandrill', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            from: from,
            apiKey: credentials.apiKey,
            senderName: credentials.senderName,
        };
        this.provider = new mandrill_1.MandrillProvider(config);
    }
}
exports.MandrillHandler = MandrillHandler;
//# sourceMappingURL=mandrill.handler.js.map