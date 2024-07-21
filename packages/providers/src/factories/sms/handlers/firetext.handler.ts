import { BaseSmsHandler } from './base.handler';
import { FiretextSmsProvider } from '@wolfxlabs/firetext';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class FiretextSmsHandler extends BaseSmsHandler {
  constructor() {
    super('firetext', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new FiretextSmsProvider({
      apiKey: credentials.apiKey,
      from: credentials.from,
    });
  }
}
