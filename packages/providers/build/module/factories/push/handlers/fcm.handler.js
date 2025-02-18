import { FcmPushProvider } from '@wolfxlabs/fcm';
import { BasePushHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class FCMHandler extends BasePushHandler {
    constructor() {
        super('fcm', ChannelTypeEnum.PUSH);
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
        this.provider = new FcmPushProvider({
            projectId: config.project_id,
            email: config.client_email,
            secretKey: config.private_key,
        });
    }
}
//# sourceMappingURL=fcm.handler.js.map