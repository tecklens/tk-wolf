import { ISmsFactory, ISmsHandler } from './interfaces';
import {
  SnsHandler,
  TelnyxHandler,
  TwilioHandler,
  Sms77Handler,
  TermiiSmsHandler,
  PlivoHandler,
  GupshupSmsHandler,
  FiretextSmsHandler,
  InfobipSmsHandler,
  BurstSmsHandler,
  ClickatellHandler,
  FortySixElksHandler,
  KannelSmsHandler,
  MaqsamHandler,
  SmsCentralHandler,
  AfricasTalkingSmsHandler,
  SendchampSmsHandler,
  ClicksendSmsHandler,
  SimpletextingSmsHandler,
  BandwidthHandler,
  GenericSmsHandler,
  MessageBirdHandler,
  AzureSmsHandler,
  WolfSmsHandler,
  NexmoHandler,
  ISendSmsHandler,
  RingCentralHandler,
  BrevoSmsHandler,
  ViettelHandler,
} from './handlers';
import { IProvider } from '@wolf/stateless';

export class SmsFactory implements ISmsFactory {
  handlers: ISmsHandler[] = [
    new SnsHandler(),
    new TelnyxHandler(),
    new TwilioHandler(),
    new Sms77Handler(),
    new TermiiSmsHandler(),
    new PlivoHandler(),
    new ClickatellHandler(),
    new GupshupSmsHandler(),
    new FiretextSmsHandler(),
    new InfobipSmsHandler(),
    new BurstSmsHandler(),
    new FortySixElksHandler(),
    new KannelSmsHandler(),
    new MaqsamHandler(),
    new SmsCentralHandler(),
    new AfricasTalkingSmsHandler(),
    new SendchampSmsHandler(),
    new ClicksendSmsHandler(),
    new SimpletextingSmsHandler(),
    new BandwidthHandler(),
    new GenericSmsHandler(),
    new MessageBirdHandler(),
    new AzureSmsHandler(),
    new WolfSmsHandler(),
    new NexmoHandler(),
    new ISendSmsHandler(),
    new RingCentralHandler(),
    new BrevoSmsHandler(),
    new ViettelHandler(),
  ];

  getHandler(integration: IProvider) {
    const handler =
      this.handlers.find((handlerItem) =>
        handlerItem.canHandle(integration.providerId, integration.channel),
      ) ?? null;

    if (!handler) return null;

    handler.buildProvider(integration.credentials);

    return handler;
  }
}
