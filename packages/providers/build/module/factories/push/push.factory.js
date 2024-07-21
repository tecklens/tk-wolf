import { APNSHandler, ExpoHandler, FCMHandler, OneSignalHandler, PusherBeamsHandler, PushpadHandler, PushWebhookHandler, } from './handlers';
export class PushFactory {
    handlers = [
        new FCMHandler(),
        new ExpoHandler(),
        new APNSHandler(),
        new OneSignalHandler(),
        new PushpadHandler(),
        new PushWebhookHandler(),
        new PusherBeamsHandler(),
    ];
    getHandler(integration) {
        const handler = this.handlers.find((handlerItem) => handlerItem.canHandle(integration.providerId, integration.channel)) ?? null;
        if (!handler)
            return null;
        handler.buildProvider(integration.credentials);
        return handler;
    }
}
//# sourceMappingURL=push.factory.js.map