import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';
import { BaseChatHandler } from './base.handler';
import { DiscordProvider } from '@wolfxlabs/discord';

export class DiscordHandler extends BaseChatHandler {
  constructor() {
    super('discord', ChannelTypeEnum.CHAT);
  }

  buildProvider(_credentials: ICredentials) {
    this.provider = new DiscordProvider({});
  }
}
