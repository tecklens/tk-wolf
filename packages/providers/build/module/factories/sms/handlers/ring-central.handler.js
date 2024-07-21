import { RingCentralSmsProvider } from '@wolf/ring-central';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class RingCentralHandler extends BaseSmsHandler {
    constructor() {
        super('ring-central', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        if (!credentials.clientId ||
            !credentials.secretKey ||
            !credentials.token ||
            !credentials.from) {
            throw Error('Invalid credentials');
        }
        this.provider = new RingCentralSmsProvider({
            clientId: credentials.clientId,
            clientSecret: credentials.secretKey,
            isSandBox: credentials.secure || false,
            jwtToken: credentials.token,
            from: credentials.from,
        });
    }
}
//# sourceMappingURL=ring-central.handler.js.map