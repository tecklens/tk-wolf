import { BaseSmsHandler } from './base.handler';
import { GupshupSmsProvider } from '@wolf/gupshup';
import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';

export class GupshupSmsHandler extends BaseSmsHandler {
  constructor() {
    super('gupshup', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new GupshupSmsProvider({
      userId: credentials.user,
      password: credentials.password,
    });
  }
}
