import { SNSSmsProvider } from '@wolfxlabs/sns';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class SnsHandler extends BaseSmsHandler {
    constructor() {
        super('sns', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new SNSSmsProvider({
            accessKeyId: credentials.apiKey,
            secretAccessKey: credentials.secretKey,
            region: credentials.region,
        });
    }
}
//# sourceMappingURL=sns.handler.js.map