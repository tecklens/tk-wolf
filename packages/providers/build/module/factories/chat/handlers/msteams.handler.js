import { BaseChatHandler } from './base.handler';
import { MsTeamsProvider } from '@wolf/ms-teams';
import { ChannelTypeEnum } from '@wolf/stateless';
export class MSTeamsHandler extends BaseChatHandler {
    constructor() {
        super('msteams', ChannelTypeEnum.CHAT);
    }
    buildProvider(_credentials) {
        this.provider = new MsTeamsProvider({});
    }
}
//# sourceMappingURL=msteams.handler.js.map