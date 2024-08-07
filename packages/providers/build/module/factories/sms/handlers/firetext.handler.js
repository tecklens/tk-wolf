import { BaseSmsHandler } from './base.handler';
import { FiretextSmsProvider } from '@wolfxlabs/firetext';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class FiretextSmsHandler extends BaseSmsHandler {
    constructor() {
        super('firetext', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new FiretextSmsProvider({
            apiKey: credentials.apiKey,
            from: credentials.from,
        });
    }
}
//# sourceMappingURL=firetext.handler.js.map