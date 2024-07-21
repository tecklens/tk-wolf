import { GenericSmsProvider } from '@wolf/generic-sms';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum } from '@wolf/stateless';
export class GenericSmsHandler extends BaseSmsHandler {
    constructor() {
        super('generic-sms', ChannelTypeEnum.SMS);
    }
    buildProvider(credentials) {
        this.provider = new GenericSmsProvider({
            baseUrl: credentials.baseUrl,
            apiKey: credentials.apiKey,
            secretKey: credentials.secretKey,
            from: credentials.from,
            apiKeyRequestHeader: credentials.apiKeyRequestHeader,
            secretKeyRequestHeader: credentials.secretKeyRequestHeader,
            idPath: credentials.idPath,
            datePath: credentials.datePath,
            domain: credentials.domain,
            authenticateByToken: credentials.authenticateByToken,
            authenticationTokenKey: credentials.authenticationTokenKey,
        });
    }
}
//# sourceMappingURL=generic-sms.handler.js.map