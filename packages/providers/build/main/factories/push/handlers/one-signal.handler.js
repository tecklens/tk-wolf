"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneSignalHandler = void 0;
const one_signal_1 = require("@wolf/one-signal");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class OneSignalHandler extends base_handler_1.BasePushHandler {
    constructor() {
        super('one-signal', stateless_1.ChannelTypeEnum.PUSH);
    }
    buildProvider(credentials) {
        if (!credentials.apiKey || !credentials.applicationId) {
            throw Error('Config is not valid for OneSignal');
        }
        this.provider = new one_signal_1.OneSignalPushProvider({
            appId: credentials.applicationId,
            apiKey: credentials.apiKey,
        });
    }
}
exports.OneSignalHandler = OneSignalHandler;
//# sourceMappingURL=one-signal.handler.js.map