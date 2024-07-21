import { ClickatellSmsProvider } from '@wolfxlabs/clickatell';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class ClickatellHandler extends BaseSmsHandler {
  constructor() {
    super('clickatell', ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new ClickatellSmsProvider({ apiKey: credentials.apiKey });
  }
}
