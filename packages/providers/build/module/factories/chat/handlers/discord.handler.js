import { ChannelTypeEnum } from '@wolfxlabs/stateless';
import { BaseChatHandler } from './base.handler';
import { DiscordProvider } from '@wolfxlabs/discord';
export class DiscordHandler extends BaseChatHandler {
    constructor() {
        super('discord', ChannelTypeEnum.CHAT);
    }
    buildProvider(_credentials) {
        this.provider = new DiscordProvider({});
    }
}
//# sourceMappingURL=discord.handler.js.map