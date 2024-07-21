"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfobipEmailHandler = void 0;
const infobip_1 = require("@wolf/infobip");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class InfobipEmailHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('infobip', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials) {
        const config = {
            baseUrl: credentials.baseUrl,
            apiKey: credentials.apiKey,
            from: credentials.from,
        };
        this.provider = new infobip_1.InfobipEmailProvider(config);
    }
}
exports.InfobipEmailHandler = InfobipEmailHandler;
//# sourceMappingURL=infobip.handler.js.map