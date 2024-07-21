import { BaseSmsHandler } from './base.handler';
import { GupshupSmsProvider } from '@wolfxlabs/gupshup';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

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
