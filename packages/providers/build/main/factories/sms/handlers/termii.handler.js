"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermiiSmsHandler = void 0;
const termii_1 = require("@wolf/termii");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class TermiiSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('termii', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new termii_1.TermiiSmsProvider({
            apiKey: credentials.apiKey,
            from: credentials.from,
        });
    }
}
exports.TermiiSmsHandler = TermiiSmsHandler;
//# sourceMappingURL=termii.handler.js.map