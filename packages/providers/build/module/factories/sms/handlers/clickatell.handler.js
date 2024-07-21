import { ClickatellSmsProvider } from '@wolfxlabs/clickatell';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class ClickatellHandler extends BaseSmsHandler {
    constructor() {
        super('clickatell', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new ClickatellSmsProvider({ apiKey: credentials.apiKey });
    }
}
//# sourceMappingURL=clickatell.handler.js.map