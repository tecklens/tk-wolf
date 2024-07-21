import { BaseSmsHandler } from './base.handler';
import { BurstSmsProvider } from '@wolfxlabs/burst-sms';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

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
