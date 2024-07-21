import { BaseSmsHandler } from './base.handler';
import { NexmoSmsProvider } from '@wolfxlabs/nexmo';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

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
