import { SNSSmsProvider } from '@wolfxlabs/sns';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class SnsHandler extends BaseSmsHandler {
  constructor() {
    super('sns', ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new SNSSmsProvider({
      accessKeyId: credentials.apiKey,
      secretAccessKey: credentials.secretKey,
      region: credentials.region,
    });
  }
}
