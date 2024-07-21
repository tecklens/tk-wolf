import { SimpletextingSmsProvider } from '@wolfxlabs/simpletexting';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class SimpletextingSmsHandler extends BaseSmsHandler {
  constructor() {
    super('simpletexting', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    const config = {
      apiKey: credentials.apiKey,
      accountPhone: credentials.from,
    };

    this.provider = new SimpletextingSmsProvider(config);
  }
}
