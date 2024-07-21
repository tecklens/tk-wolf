import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';
import { SlackProvider } from '@wolf/slack';

import { BaseChatHandler } from './base.handler';

export class SlackHandler extends BaseChatHandler {
  constructor() {
    super('slack', ChannelTypeEnum.CHAT);
  }

  buildProvider(_: ICredentials) {
    this.provider = new SlackProvider();
  }
}
