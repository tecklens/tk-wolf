import { ICredentials } from '@libs/shared/entities/integration';
import { ChannelTypeEnum } from '@novu/stateless';
// @ts-ignore
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
