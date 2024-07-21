import { ChannelTypeEnum } from '@wolf/stateless';
import { Outlook365Provider } from '@wolf/outlook365';
import { BaseHandler } from './base.handler';
export class Outlook365Handler extends BaseHandler {
    constructor() {
        super('outlook365', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials) {
        const config = {
            from: credentials.from,
            senderName: credentials.senderName,
            password: credentials.password,
        };
        this.provider = new Outlook365Provider(config);
    }
}
//# sourceMappingURL=outlook365.handler.js.map