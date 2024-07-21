"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushFactory = void 0;
const handlers_1 = require("./handlers");
class PushFactory {
    constructor() {
        this.handlers = [
            new handlers_1.FCMHandler(),
            new handlers_1.ExpoHandler(),
            new handlers_1.APNSHandler(),
            new handlers_1.OneSignalHandler(),
            new handlers_1.PushpadHandler(),
            new handlers_1.PushWebhookHandler(),
            new handlers_1.PusherBeamsHandler(),
        ];
    }
    getHandler(integration) {
        const handler = this.handlers.find((handlerItem) => handlerItem.canHandle(integration.providerId, integration.channel)) ?? null;
        if (!handler)
            return null;
        handler.buildProvider(integration.credentials);
        return handler;
    }
}
exports.PushFactory = PushFactory;
//# sourceMappingURL=push.factory.js.map