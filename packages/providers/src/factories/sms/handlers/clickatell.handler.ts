import { ClickatellSmsProvider } from '@wolf/clickatell';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';

export class ClickatellHandler extends BaseSmsHandler {
  constructor() {
    super('clickatell', ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new ClickatellSmsProvider({ apiKey: credentials.apiKey });
  }
}
