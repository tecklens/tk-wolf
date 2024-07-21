"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KannelSmsHandler = void 0;
const kannel_1 = require("@wolf/kannel");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class KannelSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('kannel', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        const config = {
            host: credentials.host || '',
            port: credentials.port || '',
            from: credentials.from || '',
            username: credentials.user,
            password: credentials.password,
        };
        this.provider = new kannel_1.KannelSmsProvider(config);
    }
}
exports.KannelSmsHandler = KannelSmsHandler;
//# sourceMappingURL=kannel.handler.js.map