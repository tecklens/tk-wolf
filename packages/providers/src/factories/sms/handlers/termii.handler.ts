import { TermiiSmsProvider } from '@wolfxlabs/termii';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class TermiiSmsHandler extends BaseSmsHandler {
  constructor() {
    super('termii', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new TermiiSmsProvider({
      apiKey: credentials.apiKey,
      from: credentials.from,
    });
  }
}
