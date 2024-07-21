import { ClicksendSmsProvider } from '@wolf/clicksend';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';

export class ClicksendSmsHandler extends BaseSmsHandler {
  constructor() {
    super('clicksend', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    const config = {
      username: credentials.user,
      apiKey: credentials.apiKey,
    };

    this.provider = new ClicksendSmsProvider(config);
  }
}
