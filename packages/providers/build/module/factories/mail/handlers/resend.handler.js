import { ChannelTypeEnum } from '@wolf/stateless';
import { ResendEmailProvider } from '@wolf/resend';
import { BaseHandler } from './base.handler';
export class ResendHandler extends BaseHandler {
    constructor() {
        super('resend', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            from: from,
            apiKey: credentials.apiKey,
            senderName: credentials.senderName,
        };
        this.provider = new ResendEmailProvider(config);
    }
}
//# sourceMappingURL=resend.handler.js.map