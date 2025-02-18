import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';
import { BrevoEmailProvider } from '@wolfxlabs/sendinblue';
import { BaseHandler } from './base.handler';

export class SendinblueHandler extends BaseHandler {
  constructor() {
    super('sendinblue', ChannelTypeEnum.EMAIL);
  }
  buildProvider(credentials: ICredentials, from?: string) {
    const config: { apiKey: string; from: string; senderName: string } = {
      apiKey: credentials.apiKey as string,
      from: from as string,
      senderName: credentials.senderName as string,
    };

    this.provider = new BrevoEmailProvider(config);
  }
}
