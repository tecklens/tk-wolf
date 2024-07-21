import { PlivoSmsProvider } from '@wolfxlabs/plivo';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class PlivoHandler extends BaseSmsHandler {
  constructor() {
    super('plivo', ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new PlivoSmsProvider({
      accountSid: credentials.accountSid,
      authToken: credentials.token,
      from: credentials.from,
    });
  }
}
