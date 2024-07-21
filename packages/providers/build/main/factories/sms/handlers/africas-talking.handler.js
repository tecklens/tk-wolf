"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfricasTalkingSmsHandler = void 0;
const africas_talking_1 = require("@wolf/africas-talking");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class AfricasTalkingSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('africas-talking', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        if (!credentials.user || !credentials.apiKey || !credentials.from) {
            throw Error('Invalid credentials');
        }
        const config = {
            apiKey: credentials.apiKey,
            username: credentials.user,
            from: credentials.from,
        };
        this.provider = new africas_talking_1.AfricasTalkingSmsProvider(config);
    }
}
exports.AfricasTalkingSmsHandler = AfricasTalkingSmsHandler;
//# sourceMappingURL=africas-talking.handler.js.map