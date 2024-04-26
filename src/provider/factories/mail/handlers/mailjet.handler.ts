import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import { ICredentials } from '@libs/shared/entities/integration';
import { MailjetEmailProvider } from '@wolf/mailjet';
import { BaseHandler } from './base.handler';

export class MailjetHandler extends BaseHandler {
  constructor() {
    super('mailjet', ChannelTypeEnum.EMAIL);
  }
  buildProvider(credentials: ICredentials, from?: string) {
    const config: {
      apiKey: string;
      apiSecret: string;
      from: string;
      senderName: string;
    } = {
      from: from as string,
      apiKey: credentials.apiKey as string,
      apiSecret: credentials.secretKey as string,
      senderName: credentials.senderName as string,
    };

    this.provider = new MailjetEmailProvider(config);
  }
}
