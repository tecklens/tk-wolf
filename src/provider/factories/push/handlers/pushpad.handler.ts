import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import { ICredentials } from '@libs/shared/entities/integration';
import { PushpadPushProvider } from '@wolf/pushpad';
import { BasePushHandler } from './base.handler';

export class PushpadHandler extends BasePushHandler {
  constructor() {
    super('pushpad', ChannelTypeEnum.PUSH);
  }

  buildProvider(credentials: ICredentials) {
    if (!credentials.apiKey || !credentials.applicationId) {
      throw Error('Config is not valid for Pushpad');
    }

    this.provider = new PushpadPushProvider({
      appId: credentials.applicationId,
      apiKey: credentials.apiKey,
    });
  }
}
