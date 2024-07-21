import { BulkSmsProvider } from '@wolfxlabs/bulk-sms';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class BulkSmsHandler extends BaseSmsHandler {
  constructor() {
    super('bulk-sms', ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    const config = {
      apiToken: credentials.apiToken,
    };
    this.provider = new BulkSmsProvider(config);
  }
}
