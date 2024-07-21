import { BaseChatHandler } from './base.handler';
import { ZulipProvider } from '@wolfxlabs/zulip';
import { ChannelTypeEnum, ChatProviderIdEnum, } from '@wolfxlabs/stateless';
export class ZulipHandler extends BaseChatHandler {
    constructor() {
        super(ChatProviderIdEnum.Zulip, ChannelTypeEnum.CHAT);
    }
    buildProvider(_credentials) {
        this.provider = new ZulipProvider({});
    }
}
//# sourceMappingURL=zulip.handler.js.map