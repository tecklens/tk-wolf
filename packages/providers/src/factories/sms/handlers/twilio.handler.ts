// @ts-ignore
import { TwilioSmsProvider } from '@wolfxlabs/twilio';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class TwilioHandler extends BaseSmsHandler {
  constructor() {
    super('twilio', ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new TwilioSmsProvider({
      accountSid: credentials.accountSid,
      authToken: credentials.token,
      from: credentials.from,
    });
  }
}
