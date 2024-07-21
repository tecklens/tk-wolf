import { ISendSmsProvider } from '@wolfxlabs/isend-sms';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class ISendSmsHandler extends BaseSmsHandler {
    constructor() {
        super('isend-sms', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        const config = {
            apiToken: credentials.apiToken ?? '',
            ...credentials,
        };
        this.provider = new ISendSmsProvider(config);
    }
}
//# sourceMappingURL=isend-sms.handler.js.map