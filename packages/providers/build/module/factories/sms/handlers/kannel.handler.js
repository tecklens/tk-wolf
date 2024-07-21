import { KannelSmsProvider } from '@wolfxlabs/kannel';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolfxlabs/stateless';
export class KannelSmsHandler extends BaseSmsHandler {
    constructor() {
        super('kannel', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        const config = {
            host: credentials.host || '',
            port: credentials.port || '',
            from: credentials.from || '',
            username: credentials.user,
            password: credentials.password,
        };
        this.provider = new KannelSmsProvider(config);
    }
}
//# sourceMappingURL=kannel.handler.js.map