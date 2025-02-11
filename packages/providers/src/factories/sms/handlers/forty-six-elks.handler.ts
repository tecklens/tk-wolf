import { BaseSmsHandler } from './base.handler';
import { FortySixElksSmsProvider } from '@wolfxlabs/forty-six-elks';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class FortySixElksHandler extends BaseSmsHandler {
  constructor() {
    super('forty-six-elks', ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new FortySixElksSmsProvider({
      user: credentials.user,
      password: credentials.password,
      from: credentials.from,
    });
  }
}
