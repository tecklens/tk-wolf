import { BaseChatHandler } from './base.handler';
import { ZulipProvider } from '@wolf/zulip';
import {
  ChannelTypeEnum,
  ChatProviderIdEnum,
  ICredentials,
} from '@wolf/stateless';

export class ZulipHandler extends BaseChatHandler {
  constructor() {
    super(ChatProviderIdEnum.Zulip, ChannelTypeEnum.CHAT);
  }

  buildProvider(_credentials: ICredentials) {
    this.provider = new ZulipProvider({});
  }
}
