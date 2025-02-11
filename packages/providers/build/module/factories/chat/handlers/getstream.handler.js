import { ChannelTypeEnum } from '@wolfxlabs/stateless';
import { BaseChatHandler } from './base.handler';
import { GetstreamChatProvider } from '@wolfxlabs/getstream';
export class GetstreamChatHandler extends BaseChatHandler {
    constructor() {
        super('getstream', ChannelTypeEnum.CHAT);
    }
    buildProvider(credentials) {
        const config = {
            apiKey: credentials.apiKey,
        };
        this.provider = new GetstreamChatProvider(config);
    }
}
//# sourceMappingURL=getstream.handler.js.map