import { BulkSmsProvider } from '@wolfxlabs/bulk-sms';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class BulkSmsHandler extends BaseSmsHandler {
    constructor() {
        super('bulk-sms', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        const config = {
            apiToken: credentials.apiToken,
        };
        this.provider = new BulkSmsProvider(config);
    }
}
//# sourceMappingURL=bulk-sms.handler.js.map