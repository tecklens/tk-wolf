import { SendgridEmailProvider } from '@wolfxlabs/sendgrid';

import { BaseHandler } from './base.handler';
import { ChannelTypeEnum, EmailProviderIdEnum } from '@wolfxlabs/stateless';

export class WolfEmailHandler extends BaseHandler {
  constructor() {
    super(EmailProviderIdEnum.Novu, ChannelTypeEnum.EMAIL);
  }

  buildProvider(credentials, from?: string) {
    this.provider = new SendgridEmailProvider({
      apiKey: credentials.apiKey,
      from,
      senderName: credentials.senderName,
      ipPoolName: credentials.ipPoolName,
    });
  }
}
