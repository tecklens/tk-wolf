import { OneSignalPushProvider } from '@wolfxlabs/one-signal';
import { BasePushHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class OneSignalHandler extends BasePushHandler {
    constructor() {
        super('one-signal', ChannelTypeEnum.PUSH);
    }
    buildProvider(credentials) {
        if (!credentials.apiKey || !credentials.applicationId) {
            throw Error('Config is not valid for OneSignal');
        }
        this.provider = new OneSignalPushProvider({
            appId: credentials.applicationId,
            apiKey: credentials.apiKey,
        });
    }
}
//# sourceMappingURL=one-signal.handler.js.map