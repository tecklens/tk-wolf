import { TelnyxSmsProvider } from '@wolf/telnyx';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class TelnyxHandler extends BaseSmsHandler {
    constructor() {
        super('telnyx', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new TelnyxSmsProvider({
            apiKey: credentials.apiKey,
            from: credentials.from,
            messageProfileId: credentials.messageProfileId,
        });
    }
}
//# sourceMappingURL=telnyx.handler.js.map