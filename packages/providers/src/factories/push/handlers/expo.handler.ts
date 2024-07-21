import { ExpoPushProvider } from '@wolfxlabs/expo';
import { BasePushHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class ExpoHandler extends BasePushHandler {
  constructor() {
    super('expo', ChannelTypeEnum.PUSH);
  }

  buildProvider(credentials: ICredentials) {
    if (!credentials.apiKey) {
      throw Error('Config is not valid for expo');
    }

    this.provider = new ExpoPushProvider({
      accessToken: credentials.apiKey,
    });
  }
}
