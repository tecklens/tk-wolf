import { BaseHandler } from './base.handler';
import { BrazeEmailProvider } from '@wolfxlabs/braze';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class BrazeEmailHandler extends BaseHandler {
    constructor() {
        super('braze', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials) {
        const config = {
            apiKey: credentials.apiKey,
            apiURL: credentials.apiURL,
            appID: credentials.appID,
        };
        this.provider = new BrazeEmailProvider(config);
    }
}
//# sourceMappingURL=braze.handler.js.map