import { BaseChatHandler } from './base.handler';
import { MattermostProvider } from '@wolfxlabs/mattermost';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class MattermostHandler extends BaseChatHandler {
    constructor() {
        super('mattermost', ChannelTypeEnum.CHAT);
    }
    buildProvider(_credentials) {
        this.provider = new MattermostProvider();
    }
}
//# sourceMappingURL=mattermost.handler.js.map