import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import { ICredentials } from '@libs/shared/entities/integration';
import { BaseSmsHandler } from './base.handler';
import { GupshupSmsProvider } from '@wolf/gupshup';

export class GupshupSmsHandler extends BaseSmsHandler {
  constructor() {
    super('gupshup', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new GupshupSmsProvider({
      userId: credentials.user,
      password: credentials.password,
    });
  }
}
