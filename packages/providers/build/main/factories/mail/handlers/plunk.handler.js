"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlunkHandler = void 0;
const stateless_1 = require("@wolfxlabs/stateless");
const plunk_1 = require("@wolfxlabs/plunk");
const base_handler_1 = require("./base.handler");
class PlunkHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('plunk', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials) {
        const config = {
            apiKey: credentials.apiKey,
            senderName: credentials.senderName,
        };
        this.provider = new plunk_1.PlunkEmailProvider(config);
    }
}
exports.PlunkHandler = PlunkHandler;
//# sourceMappingURL=plunk.handler.js.map