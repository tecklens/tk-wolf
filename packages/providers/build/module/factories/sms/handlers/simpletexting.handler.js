import { SimpletextingSmsProvider } from '@wolf/simpletexting';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class SimpletextingSmsHandler extends BaseSmsHandler {
    constructor() {
        super('simpletexting', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        const config = {
            apiKey: credentials.apiKey,
            accountPhone: credentials.from,
        };
        this.provider = new SimpletextingSmsProvider(config);
    }
}
//# sourceMappingURL=simpletexting.handler.js.map