import { ChannelTypeEnum } from '@wolf/stateless';
import { BaseChatHandler } from './base.handler';
import { DiscordProvider } from '@wolf/discord';
export class DiscordHandler extends BaseChatHandler {
    constructor() {
        super('discord', ChannelTypeEnum.CHAT);
    }
    buildProvider(_credentials) {
        this.provider = new DiscordProvider({});
    }
}
//# sourceMappingURL=discord.handler.js.map