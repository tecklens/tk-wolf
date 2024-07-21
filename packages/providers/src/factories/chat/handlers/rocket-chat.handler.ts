import { BaseChatHandler } from './base.handler';
import { RocketChatProvider } from '@wolf/rocket-chat';
import {
  ChannelTypeEnum,
  ChatProviderIdEnum,
  ICredentials,
} from '@wolf/stateless';

export class RocketChatHandler extends BaseChatHandler {
  constructor() {
    super(ChatProviderIdEnum.RocketChat, ChannelTypeEnum.CHAT);
  }

  buildProvider(credentials: ICredentials) {
    const config: { token: string; user: string } = {
      token: credentials.token as string,
      user: credentials.user as string,
    };
    this.provider = new RocketChatProvider(config);
  }
}