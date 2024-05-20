import { BaseChatHandler } from './base.handler';
import { RocketChatProvider } from '@wolf/rocket-chat';
import { ChatProviderIdEnum } from '@libs/shared/consts';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import { ICredentials } from '@libs/shared/entities/integration';

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
