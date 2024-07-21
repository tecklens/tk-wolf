import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';
import { TelegramProvider } from '@wolfxlabs/telegram';

import { BaseChatHandler } from './base.handler';

export class TelegramHandler extends BaseChatHandler {
  constructor() {
    super('telegram', ChannelTypeEnum.CHAT);
  }

  buildProvider(_: ICredentials) {
    this.provider = new TelegramProvider();
  }
}
