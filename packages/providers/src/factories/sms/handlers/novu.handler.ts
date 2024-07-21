// @ts-ignore
import { TwilioSmsProvider } from '@wolf/twilio';
import { BaseSmsHandler } from './base.handler';
import {
  ChannelTypeEnum,
  ICredentials,
  SmsProviderIdEnum,
} from '@wolf/stateless';

export class WolfSmsHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.Novu, ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new TwilioSmsProvider({
      accountSid: credentials.accountSid,
      authToken: credentials.token,
      from: credentials.from,
    });
  }
}
