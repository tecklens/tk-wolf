import { PlatformException, } from '@wolfxlabs/stateless';
export class BaseHandler {
    providerId;
    channelType;
    provider;
    constructor(providerId, channelType) {
        this.providerId = providerId;
        this.channelType = channelType;
    }
    canHandle(providerId, channelType) {
        return providerId === this.providerId && channelType === this.channelType;
    }
    async send(mailData) {
        if (process.env.NODE_ENV === 'test') {
            return {};
        }
        return await this.provider.sendMessage(mailData);
    }
    getProvider() {
        return this.provider;
    }
    async check() {
        const mailData = {
            html: '<div>checking integration</div>',
            subject: 'Checking Integration',
            to: ['no-reply@wolf.co'],
        };
        const { message, success, code } = await this.provider.checkIntegration(mailData);
        if (!success) {
            throw new PlatformException(JSON.stringify({
                success,
                code,
                message: message ||
                    'Something went wrong! Please double check your account details(Email/API key)',
            }));
        }
        return {
            success,
            code,
            message: 'Integration successful',
        };
    }
}
//# sourceMappingURL=base.handler.js.map