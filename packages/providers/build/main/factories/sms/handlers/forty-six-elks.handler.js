"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortySixElksHandler = void 0;
const base_handler_1 = require("./base.handler");
const forty_six_elks_1 = require("@wolf/forty-six-elks");
const stateless_1 = require("@wolf/stateless");
class FortySixElksHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('forty-six-elks', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new forty_six_elks_1.FortySixElksSmsProvider({
            user: credentials.user,
            password: credentials.password,
            from: credentials.from,
        });
    }
}
exports.FortySixElksHandler = FortySixElksHandler;
//# sourceMappingURL=forty-six-elks.handler.js.map