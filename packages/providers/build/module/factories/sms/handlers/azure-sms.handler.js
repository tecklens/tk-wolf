import { AzureSmsProvider } from '@wolf/azure-sms';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class AzureSmsHandler extends BaseSmsHandler {
    constructor() {
        super('azure-sms', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        if (!credentials.accessKey) {
            throw new Error('Access key is undefined');
        }
        const config = {
            connectionString: credentials.accessKey,
        };
        this.provider = new AzureSmsProvider(config);
    }
}
//# sourceMappingURL=azure-sms.handler.js.map