import { BaseChatHandler } from './base.handler';
import { MsTeamsProvider } from '@wolf/ms-teams';
import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';

export class MSTeamsHandler extends BaseChatHandler {
  constructor() {
    super('msteams', ChannelTypeEnum.CHAT);
  }

  buildProvider(_credentials: ICredentials) {
    this.provider = new MsTeamsProvider({});
  }
}
