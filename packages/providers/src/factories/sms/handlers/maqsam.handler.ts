import { MaqsamSmsProvider } from '@wolfxlabs/maqsam';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class MaqsamHandler extends BaseSmsHandler {
  constructor() {
    super('maqsam', ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new MaqsamSmsProvider({
      accessKeyId: credentials.apiKey,
      accessSecret: credentials.secretKey,
      from: credentials.from,
    });
  }
}
