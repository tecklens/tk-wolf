import { SendgridEmailProvider } from '@wolf/sendgrid';

import { BaseHandler } from './base.handler';
import { EmailProviderIdEnum } from '@libs/shared/consts';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';

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
