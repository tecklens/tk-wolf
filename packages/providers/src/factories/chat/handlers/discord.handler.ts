import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';
import { BaseChatHandler } from './base.handler';
import { DiscordProvider } from '@wolf/discord';

export class DiscordHandler extends BaseChatHandler {
  constructor() {
    super('discord', ChannelTypeEnum.CHAT);
  }

  buildProvider(_credentials: ICredentials) {
    this.provider = new DiscordProvider({});
  }
}
