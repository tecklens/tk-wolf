import { BandwidthSmsProvider } from '@wolfxlabs/bandwidth';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class BandwidthHandler extends BaseSmsHandler {
    constructor() {
        super('bandwidth', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        const config = {
            username: credentials.user,
            password: credentials.password,
            accountId: credentials.accountSid,
        };
        this.provider = new BandwidthSmsProvider(config);
    }
}
//# sourceMappingURL=bandwidth.handler.js.map