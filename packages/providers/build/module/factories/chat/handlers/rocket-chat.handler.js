import { BaseChatHandler } from './base.handler';
import { RocketChatProvider } from '@wolf/rocket-chat';
import { ChannelTypeEnum, ChatProviderIdEnum, } from '@wolf/stateless';
export class RocketChatHandler extends BaseChatHandler {
    constructor() {
        super(ChatProviderIdEnum.RocketChat, ChannelTypeEnum.CHAT);
    }
    buildProvider(credentials) {
        const config = {
            token: credentials.token,
            user: credentials.user,
        };
        this.provider = new RocketChatProvider(config);
    }
}
//# sourceMappingURL=rocket-chat.handler.js.map