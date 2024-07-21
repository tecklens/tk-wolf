import { BaseSmsHandler } from './base.handler';
import { GupshupSmsProvider } from '@wolfxlabs/gupshup';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class GupshupSmsHandler extends BaseSmsHandler {
    constructor() {
        super('gupshup', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new GupshupSmsProvider({
            userId: credentials.user,
            password: credentials.password,
        });
    }
}
//# sourceMappingURL=gupshup.handler.js.map