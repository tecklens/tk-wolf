"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APNSHandler = void 0;
const apns_1 = require("@wolf/apns");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class APNSHandler extends base_handler_1.BasePushHandler {
    constructor() {
        super('apns', stateless_1.ChannelTypeEnum.PUSH);
    }
    buildProvider(credentials) {
        if (!credentials.secretKey ||
            !credentials.apiKey ||
            !credentials.projectName) {
            throw new Error('Config is not valid for apns');
        }
        this.provider = new apns_1.APNSPushProvider({
            key: credentials.secretKey,
            keyId: credentials.apiKey,
            teamId: credentials.projectName,
            bundleId: credentials.applicationId,
            production: credentials.secure ?? false,
        });
    }
}
exports.APNSHandler = APNSHandler;
//# sourceMappingURL=apns.handler.js.map