"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrazeEmailHandler = void 0;
const base_handler_1 = require("./base.handler");
const braze_1 = require("@wolfxlabs/braze");
const stateless_1 = require("@wolfxlabs/stateless");
class BrazeEmailHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('braze', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials) {
        const config = {
            apiKey: credentials.apiKey,
            apiURL: credentials.apiURL,
            appID: credentials.appID,
        };
        this.provider = new braze_1.BrazeEmailProvider(config);
    }
}
exports.BrazeEmailHandler = BrazeEmailHandler;
//# sourceMappingURL=braze.handler.js.map