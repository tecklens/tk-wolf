import { MaqsamSmsProvider } from '@wolfxlabs/maqsam';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class MaqsamHandler extends BaseSmsHandler {
    constructor() {
        super('maqsam', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new MaqsamSmsProvider({
            accessKeyId: credentials.apiKey,
            accessSecret: credentials.secretKey,
            from: credentials.from,
        });
    }
}
//# sourceMappingURL=maqsam.handler.js.map