import { BaseChatHandler } from './base.handler';
import { MattermostProvider } from '@wolf/mattermost';
import { ICredentials, ChannelTypeEnum } from '@wolf/stateless';

export class MattermostHandler extends BaseChatHandler {
  constructor() {
    super('mattermost', ChannelTypeEnum.CHAT);
  }

  buildProvider(_credentials: ICredentials) {
    this.provider = new MattermostProvider();
  }
}
