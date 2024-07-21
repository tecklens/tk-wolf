import {
  APNSHandler,
  ExpoHandler,
  FCMHandler,
  OneSignalHandler,
  PusherBeamsHandler,
  PushpadHandler,
  PushWebhookHandler,
} from './handlers';
import { IPushFactory, IPushHandler } from './interfaces';
import { IProvider } from '@wolf/stateless';

export class PushFactory implements IPushFactory {
  handlers: IPushHandler[] = [
    new FCMHandler(),
    new ExpoHandler(),
    new APNSHandler(),
    new OneSignalHandler(),
    new PushpadHandler(),
    new PushWebhookHandler(),
    new PusherBeamsHandler(),
  ];

  getHandler(integration: IProvider): IPushHandler {
    const handler =
      this.handlers.find((handlerItem) =>
        handlerItem.canHandle(integration.providerId, integration.channel),
      ) ?? null;
    if (!handler) return null;

    handler.buildProvider(integration.credentials);

    return handler;
  }
}
