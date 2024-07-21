import { BandwidthSmsProvider } from '@wolf/bandwidth';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';

export class BandwidthHandler extends BaseSmsHandler {
  constructor() {
    super('bandwidth', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    const config = {
      username: credentials.user,
      password: credentials.password,
      accountId: credentials.accountSid,
    };

    this.provider = new BandwidthSmsProvider(config);
  }
}
