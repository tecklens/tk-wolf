import { BaseHandler } from './base.handler';
import { EmailWebhookProvider } from '@wolfxlabs/email-webhook';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';
export class EmailWebhookHandler extends BaseHandler {
  constructor() {
    super('email-webhook', ChannelTypeEnum.EMAIL);
  }

  buildProvider(credentials: ICredentials, from: string) {
    const config: {
      from: string;
      webhookUrl: string;
      hmacSecretKey?: string;
    } = {
      from: credentials.from as string,
      webhookUrl: credentials.webhookUrl as string,
      hmacSecretKey: credentials.secretKey as string,
    };
    this.provider = new EmailWebhookProvider(config);
  }
}
