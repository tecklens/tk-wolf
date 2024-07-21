import { MessageBirdSmsProvider } from '@wolf/messagebird';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class MessageBirdHandler extends BaseSmsHandler {
    constructor() {
        super('messagebird', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new MessageBirdSmsProvider({
            access_key: credentials.accessKey,
        });
    }
}
//# sourceMappingURL=messagebird.handler.js.map