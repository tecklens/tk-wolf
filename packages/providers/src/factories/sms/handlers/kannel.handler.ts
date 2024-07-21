import { KannelSmsProvider } from '@wolfxlabs/kannel';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class KannelSmsHandler extends BaseSmsHandler {
  constructor() {
    super('kannel', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    const config: {
      host: string;
      port: string;
      from: string;
      username?: string;
      password?: string;
    } = {
      host: credentials.host || '',
      port: credentials.port || '',
      from: credentials.from || '',
      username: credentials.user,
      password: credentials.password,
    };

    this.provider = new KannelSmsProvider(config);
  }
}
