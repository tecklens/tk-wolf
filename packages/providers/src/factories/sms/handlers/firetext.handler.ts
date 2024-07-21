import { BaseSmsHandler } from './base.handler';
import { FiretextSmsProvider } from '@wolf/firetext';
import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';

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