import { ChannelTypeEnum } from '@wolfxlabs/stateless';
import { BrevoEmailProvider } from '@wolfxlabs/sendinblue';
import { BaseHandler } from './base.handler';
export class SendinblueHandler extends BaseHandler {
    constructor() {
        super('sendinblue', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            apiKey: credentials.apiKey,
            from: from,
            senderName: credentials.senderName,
        };
        this.provider = new BrevoEmailProvider(config);
    }
}
//# sourceMappingURL=sendinblue.handler.js.map