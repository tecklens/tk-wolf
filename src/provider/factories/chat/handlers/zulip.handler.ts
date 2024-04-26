import { ChannelTypeEnum } from '@novu/stateless';
import { BaseChatHandler } from './base.handler';
import { ZulipProvider } from '@wolf/zulip';
import { ChatProviderIdEnum } from '@libs/shared/consts';
import { ICredentials } from '@libs/shared/entities/integration';

export class ZulipHandler extends BaseChatHandler {
  constructor() {
    super(ChatProviderIdEnum.Zulip, ChannelTypeEnum.CHAT);
  }

  buildProvider(_credentials: ICredentials) {
    this.provider = new ZulipProvider({});
  }
}
