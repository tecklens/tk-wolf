import { IEmailJsConfig } from '@wolf/emailjs/build/main/lib/emailjs.config';
import { EmailJsProvider } from '@wolf/emailjs';
import { BaseHandler } from './base.handler';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import { ICredentials } from '@libs/shared/entities/integration';

/**
 * DEPRECATED:
 * This provider has been deprecated and will be removed in future version.
 * See: https://github.com/novuhq/novu/issues/2315
 */
export class EmailJsHandler extends BaseHandler {
  constructor() {
    super('emailjs', ChannelTypeEnum.EMAIL);
  }
  buildProvider(credentials: ICredentials, from?: string) {
    const config: IEmailJsConfig = {
      from: from as string,
      host: credentials.host as string,
      port: Number(credentials.port),
      secure: credentials.secure as boolean,
      user: credentials.user as string,
      password: credentials.password as string,
    };

    this.provider = new EmailJsProvider(config);
  }
}
