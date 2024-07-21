import { BaseChatHandler } from './base.handler';
// @ts-ignore
import { ZulipProvider } from '@wolfxlabs/zulip';
import {
  ChannelTypeEnum,
  ChatProviderIdEnum,
  ICredentials,
} from '@wolfxlabs/stateless';

export class ZulipHandler extends BaseChatHandler {
  constructor() {
    super(ChatProviderIdEnum.Zulip, ChannelTypeEnum.CHAT);
  }

  buildProvider(_credentials: ICredentials) {
    this.provider = new ZulipProvider({});
  }
}
