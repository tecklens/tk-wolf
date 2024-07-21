import { BaseSmsHandler } from './base.handler';
import { FortySixElksSmsProvider } from '@wolfxlabs/forty-six-elks';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
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