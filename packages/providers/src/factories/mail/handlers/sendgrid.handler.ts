import { SendgridEmailProvider } from '@wolfxlabs/sendgrid';

import { BaseHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class SendgridHandler extends BaseHandler {
  constructor() {
    super('sendgrid', ChannelTypeEnum.EMAIL);
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
