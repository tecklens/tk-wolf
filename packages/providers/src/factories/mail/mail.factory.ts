import {
  SendgridHandler,
  MailgunHandler,
  MailjetHandler,
  MailtrapHandler,
  MandrillHandler,
  NodemailerHandler,
  PostmarkHandler,
  SendinblueHandler,
  SESHandler,
  NetCoreHandler,
  InfobipEmailHandler,
  MailerSendHandler,
  Outlook365Handler,
  ResendHandler,
  SparkPostHandler,
  EmailWebhookHandler,
  WolfEmailHandler,
  PlunkHandler,
  BrazeEmailHandler,
} from './handlers';
import { IMailHandler } from './interfaces/send.handler.interface';
import { IProvider } from '@wolf/stateless';

export class MailFactory {
  handlers: IMailHandler[] = [
    new SendgridHandler(),
    new MailgunHandler(),
    new NetCoreHandler(),
    new MailjetHandler(),
    new MailtrapHandler(),
    new MandrillHandler(),
    new NodemailerHandler(),
    new PostmarkHandler(),
    new SendinblueHandler(),
    new SESHandler(),
    new InfobipEmailHandler(),
    new MailerSendHandler(),
    new Outlook365Handler(),
    new ResendHandler(),
    new PlunkHandler(),
    new SparkPostHandler(),
    new EmailWebhookHandler(),
    new WolfEmailHandler(),
    new BrazeEmailHandler(),
  ];

  getHandler(
    integration: Pick<IProvider, 'credentials' | 'channel' | 'providerId'>,
    from?: string,
  ): IMailHandler {
    const handler =
      this.handlers.find((handlerItem) =>
        handlerItem.canHandle(integration.providerId, integration.channel),
      ) ?? null;

    if (!handler) throw new Error('Handler for provider was not found');

    handler.buildProvider(integration.credentials, from);

    return handler;
  }
}
