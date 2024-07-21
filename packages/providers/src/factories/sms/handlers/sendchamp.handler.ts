import { SendchampSmsProvider } from '@wolf/sendchamp';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';

export class SendchampSmsHandler extends BaseSmsHandler {
  constructor() {
    super('sendchamp', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    if (!credentials.apiKey || !credentials.from) {
      throw Error('Invalid credentials');
    }

    const config = {
      apiKey: credentials.apiKey,
      from: credentials.from,
    };

    this.provider = new SendchampSmsProvider(config);
  }
}
