"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushpadHandler = void 0;
const pushpad_1 = require("@wolf/pushpad");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class PushpadHandler extends base_handler_1.BasePushHandler {
    constructor() {
        super('pushpad', stateless_1.ChannelTypeEnum.PUSH);
    }
    buildProvider(credentials) {
        if (!credentials.apiKey || !credentials.applicationId) {
            throw Error('Config is not valid for Pushpad');
        }
        this.provider = new pushpad_1.PushpadPushProvider({
            appId: credentials.applicationId,
            apiKey: credentials.apiKey,
        });
    }
}
exports.PushpadHandler = PushpadHandler;
//# sourceMappingURL=pushpad.handler.js.map