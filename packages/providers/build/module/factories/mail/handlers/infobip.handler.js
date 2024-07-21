import { InfobipEmailProvider } from '@wolfxlabs/infobip';
import { BaseHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class InfobipEmailHandler extends BaseHandler {
    constructor() {
        super('infobip', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials) {
        const config = {
            baseUrl: credentials.baseUrl,
            apiKey: credentials.apiKey,
            from: credentials.from,
        };
        this.provider = new InfobipEmailProvider(config);
    }
}
//# sourceMappingURL=infobip.handler.js.map