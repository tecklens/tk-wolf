import { ChannelTypeEnum } from '@wolf/stateless';
import { MandrillProvider } from '@wolf/mandrill';
import { BaseHandler } from './base.handler';
export class MandrillHandler extends BaseHandler {
    constructor() {
        super('mandrill', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            from: from,
            apiKey: credentials.apiKey,
            senderName: credentials.senderName,
        };
        this.provider = new MandrillProvider(config);
    }
}
//# sourceMappingURL=mandrill.handler.js.map