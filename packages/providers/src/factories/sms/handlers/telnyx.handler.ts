import { TelnyxSmsProvider } from '@wolfxlabs/telnyx';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class TelnyxHandler extends BaseSmsHandler {
  constructor() {
    super('telnyx', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new TelnyxSmsProvider({
      apiKey: credentials.apiKey,
      from: credentials.from,
      messageProfileId: credentials.messageProfileId,
    });
  }
}
