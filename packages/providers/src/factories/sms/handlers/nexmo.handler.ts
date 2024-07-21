import { BaseSmsHandler } from './base.handler';
import { NexmoSmsProvider } from '@wolf/nexmo';
import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';

export class NexmoHandler extends BaseSmsHandler {
  constructor() {
    super('nexmo', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new NexmoSmsProvider({
      apiKey: credentials.apiKey,
      from: credentials.from,
      apiSecret: credentials.secretKey,
    });
  }
}
