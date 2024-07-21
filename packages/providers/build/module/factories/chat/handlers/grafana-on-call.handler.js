import { GrafanaOnCallChatProvider } from '@wolf/grafana-on-call';
import { BaseChatHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class GrafanaOnCallHandler extends BaseChatHandler {
    constructor() {
        super('grafana-on-call', ChannelTypeEnum.CHAT);
    }
    buildProvider(credentials) {
        this.provider = new GrafanaOnCallChatProvider(credentials);
    }
}
//# sourceMappingURL=grafana-on-call.handler.js.map