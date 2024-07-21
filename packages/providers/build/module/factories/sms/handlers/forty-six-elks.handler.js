import { BaseSmsHandler } from './base.handler';
import { FortySixElksSmsProvider } from '@wolf/forty-six-elks';
import { ChannelTypeEnum } from '@wolf/stateless';
export class FortySixElksHandler extends BaseSmsHandler {
    constructor() {
        super('forty-six-elks', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new FortySixElksSmsProvider({
            user: credentials.user,
            password: credentials.password,
            from: credentials.from,
        });
    }
}
//# sourceMappingURL=forty-six-elks.handler.js.map