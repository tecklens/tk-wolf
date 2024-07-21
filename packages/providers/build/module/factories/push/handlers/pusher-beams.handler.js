import { PusherBeamsPushProvider } from '@wolfxlabs/pusher-beams';
import { BasePushHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class PusherBeamsHandler extends BasePushHandler {
    constructor() {
        super('pusher-beams', ChannelTypeEnum.PUSH);
    }
    buildProvider(credentials) {
        if (!credentials.instanceId || !credentials.secretKey) {
            throw Error('Config is not valid for Pusher Beams');
        }
        this.provider = new PusherBeamsPushProvider({
            instanceId: credentials.instanceId,
            secretKey: credentials.secretKey,
        });
    }
}
//# sourceMappingURL=pusher-beams.handler.js.map