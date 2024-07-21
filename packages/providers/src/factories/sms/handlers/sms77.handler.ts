import { Sms77SmsProvider } from '@wolf/sms77';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';

export class Sms77Handler extends BaseSmsHandler {
  constructor() {
    super('sms77', ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new Sms77SmsProvider({
      apiKey: credentials.apiKey,
      from: credentials.from,
    });
  }
}
