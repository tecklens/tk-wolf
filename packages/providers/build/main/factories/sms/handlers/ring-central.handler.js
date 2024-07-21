"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RingCentralHandler = void 0;
const ring_central_1 = require("@wolf/ring-central");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class RingCentralHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('ring-central', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        if (!credentials.clientId ||
            !credentials.secretKey ||
            !credentials.token ||
            !credentials.from) {
            throw Error('Invalid credentials');
        }
        this.provider = new ring_central_1.RingCentralSmsProvider({
            clientId: credentials.clientId,
            clientSecret: credentials.secretKey,
            isSandBox: credentials.secure || false,
            jwtToken: credentials.token,
            from: credentials.from,
        });
    }
}
exports.RingCentralHandler = RingCentralHandler;
//# sourceMappingURL=ring-central.handler.js.map