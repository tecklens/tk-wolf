import { TermiiSmsProvider } from '@wolfxlabs/termii';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class TermiiSmsHandler extends BaseSmsHandler {
    constructor() {
        super('termii', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new TermiiSmsProvider({
            apiKey: credentials.apiKey,
            from: credentials.from,
        });
    }
}
//# sourceMappingURL=termii.handler.js.map