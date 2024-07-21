"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PusherBeamsHandler = void 0;
const pusher_beams_1 = require("@wolf/pusher-beams");
const base_handler_1 = require("./base.handler");
const stateless_1 = require("@wolf/stateless");
class PusherBeamsHandler extends base_handler_1.BasePushHandler {
    constructor() {
        super('pusher-beams', stateless_1.ChannelTypeEnum.PUSH);
    }
    buildProvider(credentials) {
        if (!credentials.instanceId || !credentials.secretKey) {
            throw Error('Config is not valid for Pusher Beams');
        }
        this.provider = new pusher_beams_1.PusherBeamsPushProvider({
            instanceId: credentials.instanceId,
            secretKey: credentials.secretKey,
        });
    }
}
exports.PusherBeamsHandler = PusherBeamsHandler;
//# sourceMappingURL=pusher-beams.handler.js.map