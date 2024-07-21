import { BaseSmsHandler } from './base.handler';
import { BurstSmsProvider } from '@wolf/burst-sms';
import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';

export class BurstSmsHandler extends BaseSmsHandler {
  constructor() {
    super('burst-sms', ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new BurstSmsProvider({
      apiKey: credentials.apiKey,
      secretKey: credentials.secretKey,
    });
  }
}
