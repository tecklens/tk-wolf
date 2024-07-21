import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';
import { TelegramProvider } from '@wolf/telegram';

import { BaseChatHandler } from './base.handler';

export class TelegramHandler extends BaseChatHandler {
  constructor() {
    super('telegram', ChannelTypeEnum.CHAT);
  }

  buildProvider(_: ICredentials) {
    this.provider = new TelegramProvider();
  }
}
