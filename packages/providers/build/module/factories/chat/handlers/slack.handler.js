import { ChannelTypeEnum } from '@wolfxlabs/stateless';
import { SlackProvider } from '@wolfxlabs/slack';
import { BaseChatHandler } from './base.handler';
export class SlackHandler extends BaseChatHandler {
    constructor() {
        super('slack', ChannelTypeEnum.CHAT);
    }
    buildProvider(_) {
        this.provider = new SlackProvider();
    }
}
//# sourceMappingURL=slack.handler.js.map