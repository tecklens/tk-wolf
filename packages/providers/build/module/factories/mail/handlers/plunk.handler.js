import { ChannelTypeEnum } from '@wolf/stateless';
import { PlunkEmailProvider } from '@wolf/plunk';
import { BaseHandler } from './base.handler';
export class PlunkHandler extends BaseHandler {
    constructor() {
        super('plunk', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials) {
        const config = {
            apiKey: credentials.apiKey,
            senderName: credentials.senderName,
        };
        this.provider = new PlunkEmailProvider(config);
    }
}
//# sourceMappingURL=plunk.handler.js.map