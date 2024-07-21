import { RyverChatProvider } from '@wolfxlabs/ryver';
import { BaseChatHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class RyverHandler extends BaseChatHandler {
    constructor() {
        super('ryver', ChannelTypeEnum.CHAT);
    }
    buildProvider(_credentials) {
        this.provider = new RyverChatProvider();
    }
}
//# sourceMappingURL=ryver.handler.js.map