import { ChannelTypeEnum } from '@wolfxlabs/stateless';
import { SESEmailProvider } from '@wolfxlabs/ses';
import { BaseHandler } from './base.handler';
export class SESHandler extends BaseHandler {
    constructor() {
        super('ses', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            region: credentials.region,
            accessKeyId: credentials.apiKey,
            secretAccessKey: credentials.secretKey,
            senderName: credentials.senderName ?? 'no-reply',
            from: from,
        };
        this.provider = new SESEmailProvider(config);
    }
}
//# sourceMappingURL=ses.handler.js.map