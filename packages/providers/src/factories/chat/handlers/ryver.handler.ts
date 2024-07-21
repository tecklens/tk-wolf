import { RyverChatProvider } from '@wolf/ryver';
import { BaseChatHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';

export class RyverHandler extends BaseChatHandler {
  constructor() {
    super('ryver', ChannelTypeEnum.CHAT);
  }

  buildProvider(_credentials: ICredentials) {
    this.provider = new RyverChatProvider();
  }
}
