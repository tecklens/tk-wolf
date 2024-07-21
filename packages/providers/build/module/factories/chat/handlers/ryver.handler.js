import { RyverChatProvider } from '@wolf/ryver';
import { BaseChatHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class RyverHandler extends BaseChatHandler {
    constructor() {
        super('ryver', ChannelTypeEnum.CHAT);
    }
    buildProvider(_credentials) {
        this.provider = new RyverChatProvider();
    }
}
//# sourceMappingURL=ryver.handler.js.map