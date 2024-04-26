import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import { ICredentials } from '@libs/shared/entities/integration';
import { AzureSmsProvider } from '@wolf/azure-sms';
import { BaseSmsHandler } from './base.handler';

export class AzureSmsHandler extends BaseSmsHandler {
  constructor() {
    super('azure-sms', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    if (!credentials.accessKey) {
      throw new Error('Access key is undefined');
    }
    const config = {
      connectionString: credentials.accessKey,
    };

    this.provider = new AzureSmsProvider(config);
  }
}
