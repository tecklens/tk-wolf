import { InfobipSmsProvider } from '@wolf/infobip';
import { BaseSmsHandler } from './base.handler';
import { SmsProviderIdEnum } from '@libs/shared/consts/providers';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import { ICredentials } from '@libs/shared/entities/integration';
export class InfobipSmsHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.Infobip, ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new InfobipSmsProvider({
      baseUrl: credentials.baseUrl,
      apiKey: credentials.apiKey,
      from: credentials.from,
    });
  }
}
