import { AfricasTalkingSmsProvider } from '@wolf/africas-talking';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class AfricasTalkingSmsHandler extends BaseSmsHandler {
    constructor() {
        super('africas-talking', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        if (!credentials.user || !credentials.apiKey || !credentials.from) {
            throw Error('Invalid credentials');
        }
        const config = {
            apiKey: credentials.apiKey,
            username: credentials.user,
            from: credentials.from,
        };
        this.provider = new AfricasTalkingSmsProvider(config);
    }
}
//# sourceMappingURL=africas-talking.handler.js.map