"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpoHandler = void 0;
const expo_1 = require("@wolfxlabs/expo");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolfxlabs/stateless");
class ExpoHandler extends base_handler_1.BasePushHandler {
    constructor() {
        super('expo', stateless_1.ChannelTypeEnum.PUSH);
    }
    buildProvider(credentials) {
        if (!credentials.apiKey) {
            throw Error('Config is not valid for expo');
        }
        this.provider = new expo_1.ExpoPushProvider({
            accessToken: credentials.apiKey,
        });
    }
}
exports.ExpoHandler = ExpoHandler;
//# sourceMappingURL=expo.handler.js.map