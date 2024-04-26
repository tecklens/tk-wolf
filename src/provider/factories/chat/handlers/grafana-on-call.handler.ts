import { ICredentials } from '@libs/shared/entities/integration';
import { ChannelTypeEnum } from '@novu/stateless';
import { GrafanaOnCallChatProvider } from '@wolf/grafana-on-call';

import { BaseChatHandler } from './base.handler';

export class GrafanaOnCallHandler extends BaseChatHandler {
  constructor() {
    super('grafana-on-call', ChannelTypeEnum.CHAT);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new GrafanaOnCallChatProvider(credentials);
  }
}
