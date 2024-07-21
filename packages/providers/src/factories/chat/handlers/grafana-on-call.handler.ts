import { GrafanaOnCallChatProvider } from '@wolf/grafana-on-call';

import { BaseChatHandler } from './base.handler';
import { ICredentials, ChannelTypeEnum } from '@wolf/stateless';

export class GrafanaOnCallHandler extends BaseChatHandler {
  constructor() {
    super('grafana-on-call', ChannelTypeEnum.CHAT);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new GrafanaOnCallChatProvider(credentials);
  }
}
