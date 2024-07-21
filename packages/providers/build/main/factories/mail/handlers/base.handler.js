"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHandler = void 0;
const stateless_1 = require("@wolf/stateless");
class BaseHandler {
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
            throw new stateless_1.PlatformException(JSON.stringify({
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
exports.BaseHandler = BaseHandler;
//# sourceMappingURL=base.handler.js.map