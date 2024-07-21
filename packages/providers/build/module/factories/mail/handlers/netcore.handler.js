import { ChannelTypeEnum } from '@wolfxlabs/stateless';
import { NetCoreProvider } from '@wolfxlabs/netcore';
import { BaseHandler } from './base.handler';
export class NetCoreHandler extends BaseHandler {
    constructor() {
        super('netcore', ChannelTypeEnum.EMAIL);
    }
    buildProvider(credentials, from) {
        const config = {
            apiKey: credentials.apiKey,
            from: from,
            senderName: credentials.senderName,
        };
        this.provider = new NetCoreProvider(config);
    }
}
//# sourceMappingURL=netcore.handler.js.map