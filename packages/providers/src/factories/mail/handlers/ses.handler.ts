import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';
import { SESConfig } from '@wolf/ses/build/module/lib/ses.config';
import { SESEmailProvider } from '@wolf/ses';
import { BaseHandler } from './base.handler';

export class SESHandler extends BaseHandler {
  constructor() {
    super('ses', ChannelTypeEnum.EMAIL);
  }

  buildProvider(credentials: ICredentials, from?: string) {
    const config: SESConfig = {
      region: credentials.region as string,
      accessKeyId: credentials.apiKey as string,
      secretAccessKey: credentials.secretKey as string,
      senderName: credentials.senderName ?? 'no-reply',
      from: from as string,
    };

    this.provider = new SESEmailProvider(config);
  }
}
