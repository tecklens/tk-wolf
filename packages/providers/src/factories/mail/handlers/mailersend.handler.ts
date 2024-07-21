import { MailersendEmailProvider } from '@wolfxlabs/mailersend';

import { BaseHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class MailerSendHandler extends BaseHandler {
  constructor() {
    super('mailersend', ChannelTypeEnum.EMAIL);
  }

  buildProvider(credentials: ICredentials, from?: string) {
    this.provider = new MailersendEmailProvider({
      apiKey: credentials.apiKey as string,
      from: from as string,
      senderName: credentials.senderName,
    });
  }
}
