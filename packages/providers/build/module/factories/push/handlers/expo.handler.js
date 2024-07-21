import { ExpoPushProvider } from '@wolf/expo';
import { BasePushHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class ExpoHandler extends BasePushHandler {
    constructor() {
        super('expo', ChannelTypeEnum.PUSH);
    }
    buildProvider(credentials) {
        if (!credentials.apiKey) {
            throw Error('Config is not valid for expo');
        }
        this.provider = new ExpoPushProvider({
            accessToken: credentials.apiKey,
        });
    }
}
//# sourceMappingURL=expo.handler.js.map