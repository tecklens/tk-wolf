"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCMHandler = void 0;
const fcm_1 = require("@wolf/fcm");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class FCMHandler extends base_handler_1.BasePushHandler {
    constructor() {
        super('fcm', stateless_1.ChannelTypeEnum.PUSH);
    }
    buildProvider(credentials) {
        const credentialConfig = {
            user: credentials.user,
            serviceAccount: credentials.serviceAccount,
        };
        const updatedCredentials = credentialConfig.serviceAccount
            ? credentialConfig.serviceAccount
            : credentialConfig.user;
        if (!updatedCredentials) {
            throw new Error('Config is not valid for fcm');
        }
        const config = JSON.parse(updatedCredentials);
        this.provider = new fcm_1.FcmPushProvider({
            projectId: config.project_id,
            email: config.client_email,
            secretKey: config.private_key,
        });
    }
}
exports.FCMHandler = FCMHandler;
//# sourceMappingURL=fcm.handler.js.map