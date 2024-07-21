"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpletextingSmsHandler = void 0;
const simpletexting_1 = require("@wolf/simpletexting");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class SimpletextingSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('simpletexting', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        const config = {
            apiKey: credentials.apiKey,
            accountPhone: credentials.from,
        };
        this.provider = new simpletexting_1.SimpletextingSmsProvider(config);
    }
}
exports.SimpletextingSmsHandler = SimpletextingSmsHandler;
//# sourceMappingURL=simpletexting.handler.js.map