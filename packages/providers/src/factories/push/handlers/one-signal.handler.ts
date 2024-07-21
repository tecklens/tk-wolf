import { OneSignalPushProvider } from '@wolf/one-signal';
import { BasePushHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';

export class OneSignalHandler extends BasePushHandler {
  constructor() {
    super('one-signal', ChannelTypeEnum.PUSH);
  }

  buildProvider(credentials: ICredentials) {
    if (!credentials.apiKey || !credentials.applicationId) {
      throw Error('Config is not valid for OneSignal');
    }

    this.provider = new OneSignalPushProvider({
      appId: credentials.applicationId,
      apiKey: credentials.apiKey,
    });
  }
}
