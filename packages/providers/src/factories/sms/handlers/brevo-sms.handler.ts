import { BaseSmsHandler } from './base.handler';
import { BrevoSmsProvider } from '@wolfxlabs/brevo-sms';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class BrevoSmsHandler extends BaseSmsHandler {
  constructor() {
    super('brevo-sms', ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    if (!credentials.apiKey || !credentials.from) {
      throw Error('Invalid credentials');
    }

    const config = {
      apiKey: credentials.apiKey,
      from: credentials.from,
    };

    this.provider = new BrevoSmsProvider(config);
  }
}
