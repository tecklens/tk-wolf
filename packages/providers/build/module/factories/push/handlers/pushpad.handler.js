import { PushpadPushProvider } from '@wolf/pushpad';
import { BasePushHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class PushpadHandler extends BasePushHandler {
    constructor() {
        super('pushpad', ChannelTypeEnum.PUSH);
    }
    buildProvider(credentials) {
        if (!credentials.apiKey || !credentials.applicationId) {
            throw Error('Config is not valid for Pushpad');
        }
        this.provider = new PushpadPushProvider({
            appId: credentials.applicationId,
            apiKey: credentials.apiKey,
        });
    }
}
//# sourceMappingURL=pushpad.handler.js.map