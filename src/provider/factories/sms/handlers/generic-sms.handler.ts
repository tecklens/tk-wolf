import { GenericSmsProvider } from '@wolf/generic-sms';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import { ICredentials } from '@libs/shared/entities/integration';
import { BaseSmsHandler } from './base.handler';

export class GenericSmsHandler extends BaseSmsHandler {
  constructor() {
    super('generic-sms', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new GenericSmsProvider({
      baseUrl: credentials.baseUrl,
      apiKey: credentials.apiKey,
      secretKey: credentials.secretKey,
      from: credentials.from,
      apiKeyRequestHeader: credentials.apiKeyRequestHeader,
      secretKeyRequestHeader: credentials.secretKeyRequestHeader,
      idPath: credentials.idPath,
      datePath: credentials.datePath,
      domain: credentials.domain,
      authenticateByToken: credentials.authenticateByToken,
      authenticationTokenKey: credentials.authenticationTokenKey,
    });
  }
}