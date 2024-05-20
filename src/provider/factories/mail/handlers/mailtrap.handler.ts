import { MailtrapEmailProvider } from '@wolf/mailtrap';
import { BaseHandler } from './base.handler';
import { EmailProviderIdEnum } from '@libs/shared/consts';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import { ICredentials } from '@libs/shared/entities/integration';

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
