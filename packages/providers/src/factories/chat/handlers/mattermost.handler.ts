import { BaseChatHandler } from './base.handler';
import { MattermostProvider } from '@wolfxlabs/mattermost';
import { ICredentials, ChannelTypeEnum } from '@wolfxlabs/stateless';

export class MattermostHandler extends BaseChatHandler {
  constructor() {
    super('mattermost', ChannelTypeEnum.CHAT);
  }

  buildProvider(_credentials: ICredentials) {
    this.provider = new MattermostProvider();
  }
}
