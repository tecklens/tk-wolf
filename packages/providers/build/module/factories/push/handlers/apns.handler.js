import { APNSPushProvider } from '@wolfxlabs/apns';
import { BasePushHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class APNSHandler extends BasePushHandler {
    constructor() {
        super('apns', ChannelTypeEnum.PUSH);
    }
    buildProvider(credentials) {
        if (!credentials.secretKey ||
            !credentials.apiKey ||
            !credentials.projectName) {
            throw new Error('Config is not valid for apns');
        }
        this.provider = new APNSPushProvider({
            key: credentials.secretKey,
            keyId: credentials.apiKey,
            teamId: credentials.projectName,
            bundleId: credentials.applicationId,
            production: credentials.secure ?? false,
        });
    }
}
//# sourceMappingURL=apns.handler.js.map