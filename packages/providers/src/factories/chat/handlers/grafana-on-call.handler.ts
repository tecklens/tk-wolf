import { GrafanaOnCallChatProvider } from '@wolfxlabs/grafana-on-call';

import { BaseChatHandler } from './base.handler';
import { ICredentials, ChannelTypeEnum } from '@wolfxlabs/stateless';

export class GrafanaOnCallHandler extends BaseChatHandler {
  constructor() {
    super('grafana-on-call', ChannelTypeEnum.CHAT);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new GrafanaOnCallChatProvider(credentials);
  }
}
