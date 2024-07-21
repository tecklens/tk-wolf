import { MailtrapEmailProvider } from '@wolfxlabs/mailtrap';
import { BaseHandler } from './base.handler';
import { ChannelTypeEnum, EmailProviderIdEnum, ICredentials } from '@wolfxlabs/stateless';

export class MailtrapHandler extends BaseHandler {
  constructor() {
    super(EmailProviderIdEnum.Mailtrap, ChannelTypeEnum.EMAIL);
  }

  buildProvider(credentials: ICredentials, from: string) {
    const config: { apiKey: string; from: string } = {
      from: from as string,
      apiKey: credentials.apiKey as string,
    };

    this.provider = new MailtrapEmailProvider(config);
  }
}
