import { RyverChatProvider } from '@wolfxlabs/ryver';
import { BaseChatHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class RyverHandler extends BaseChatHandler {
  constructor() {
    super('ryver', ChannelTypeEnum.CHAT);
  }

  buildProvider(_credentials: ICredentials) {
    this.provider = new RyverChatProvider();
  }
}
