"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericSmsHandler = void 0;
const generic_sms_1 = require("@wolf/generic-sms");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class GenericSmsHandler extends base_handler_1.BaseSmsHandler {
    constructor() {
        super('generic-sms', stateless_1.ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new generic_sms_1.GenericSmsProvider({
            baseUrl: credentials.baseUrl,
            apiKey: credentials.apiKey,
            secretKey: credentials.secretKey,
            from: credentials.from,
            apiKeyRequestHeader: credentials.apiKeyRequestHeader,
            secretKeyRequestHeader: credentials.secretKeyRequestHeader,
            idPath: credentials.idPath,
            datePath: credentials.datePath,
            domain: credentials.domain,
            authenticateByToken: credentials.authenticateByToken,
            authenticationTokenKey: credentials.authenticationTokenKey,
        });
    }
}
exports.GenericSmsHandler = GenericSmsHandler;
//# sourceMappingURL=generic-sms.handler.js.map