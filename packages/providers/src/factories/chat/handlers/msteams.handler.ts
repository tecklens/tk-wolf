import { BaseChatHandler } from './base.handler';
import { MsTeamsProvider } from '@wolfxlabs/ms-teams';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class MSTeamsHandler extends BaseChatHandler {
  constructor() {
    super('msteams', ChannelTypeEnum.CHAT);
  }

  buildProvider(_credentials: ICredentials) {
    this.provider = new MsTeamsProvider({});
  }
}
