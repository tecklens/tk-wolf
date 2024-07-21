import { InfobipSmsProvider } from '@wolf/infobip';
import { BaseSmsHandler } from './base.handler';
import {
  ChannelTypeEnum,
  ICredentials,
  SmsProviderIdEnum,
} from '@wolf/stateless';
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
