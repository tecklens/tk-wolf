import { SparkPostEmailProvider } from '@wolfxlabs/sparkpost';
import { BaseHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class SparkPostHandler extends BaseHandler {
    constructor() {
        super('sparkpost', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            from: from,
            apiKey: credentials.apiKey,
            region: credentials.region,
            senderName: credentials.senderName,
        };
        this.provider = new SparkPostEmailProvider(config);
    }
}
//# sourceMappingURL=sparkpost.handler.js.map