import { TwilioSmsProvider } from '@wolf/twilio';
import { BaseSmsHandler } from './base.handler';
import { SmsProviderIdEnum } from '@libs/shared/consts/providers';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import { ICredentials } from '@libs/shared/entities/integration';

export class WolfSmsHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.Novu, ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new TwilioSmsProvider({
      accountSid: credentials.accountSid,
      authToken: credentials.token,
      from: credentials.from,
    });
  }
}
