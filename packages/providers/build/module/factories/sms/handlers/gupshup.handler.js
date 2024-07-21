import { BaseSmsHandler } from './base.handler';
import { GupshupSmsProvider } from '@wolf/gupshup';
import { ChannelTypeEnum } from '@wolf/stateless';
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