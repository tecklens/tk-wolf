"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetCoreHandler = void 0;
const stateless_1 = require("@wolfxlabs/stateless");
const netcore_1 = require("@wolfxlabs/netcore");
const base_handler_1 = require("./base.handler");
class NetCoreHandler extends base_handler_1.BaseHandler {
    constructor() {
        super('netcore', stateless_1.ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            apiKey: credentials.apiKey,
            from: from,
            senderName: credentials.senderName,
        };
        this.provider = new netcore_1.NetCoreProvider(config);
    }
}
exports.NetCoreHandler = NetCoreHandler;
//# sourceMappingURL=netcore.handler.js.map