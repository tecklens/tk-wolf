import { BaseChatHandler } from './base.handler';
import { MsTeamsProvider } from '@wolfxlabs/ms-teams';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class MSTeamsHandler extends BaseChatHandler {
    constructor() {
        super('msteams', ChannelTypeEnum.CHAT);
    }
    buildProvider(_credentials) {
        this.provider = new MsTeamsProvider({});
    }
}
//# sourceMappingURL=msteams.handler.js.map