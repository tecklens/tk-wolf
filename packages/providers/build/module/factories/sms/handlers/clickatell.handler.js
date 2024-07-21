import { ClickatellSmsProvider } from '@wolf/clickatell';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class ClickatellHandler extends BaseSmsHandler {
    constructor() {
        super('clickatell', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new ClickatellSmsProvider({ apiKey: credentials.apiKey });
    }
}
//# sourceMappingURL=clickatell.handler.js.map