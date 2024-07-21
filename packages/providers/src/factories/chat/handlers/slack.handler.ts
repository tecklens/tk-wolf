import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';
import { SlackProvider } from '@wolfxlabs/slack';

import { BaseChatHandler } from './base.handler';

export class SlackHandler extends BaseChatHandler {
  constructor() {
    super('slack', ChannelTypeEnum.CHAT);
  }

  buildProvider(_: ICredentials) {
    this.provider = new SlackProvider();
  }
}
