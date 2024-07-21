import { ChannelTypeEnum } from '@wolf/stateless';
import { PostmarkEmailProvider } from '@wolf/postmark';
import { BaseHandler } from './base.handler';
export class PostmarkHandler extends BaseHandler {
    constructor() {
        super('postmark', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            from: from,
            apiKey: credentials.apiKey,
        };
        this.provider = new PostmarkEmailProvider(config);
    }
}
//# sourceMappingURL=postmark.handler.js.map