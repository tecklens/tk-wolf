import { AfricasTalkingSmsProvider } from '@wolfxlabs/africas-talking';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class AfricasTalkingSmsHandler extends BaseSmsHandler {
  constructor() {
    super('africas-talking', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    if (!credentials.user || !credentials.apiKey || !credentials.from) {
      throw Error('Invalid credentials');
    }

    const config = {
      apiKey: credentials.apiKey,
      username: credentials.user,
      from: credentials.from,
    };

    this.provider = new AfricasTalkingSmsProvider(config);
  }
}
