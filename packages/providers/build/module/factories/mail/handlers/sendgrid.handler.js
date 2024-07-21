import { SendgridEmailProvider } from '@wolf/sendgrid';
import { BaseHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class SendgridHandler extends BaseHandler {
    constructor() {
        super('sendgrid', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        this.provider = new SendgridEmailProvider({
            apiKey: credentials.apiKey,
            from,
            senderName: credentials.senderName,
            ipPoolName: credentials.ipPoolName,
        });
    }
}
//# sourceMappingURL=sendgrid.handler.js.map