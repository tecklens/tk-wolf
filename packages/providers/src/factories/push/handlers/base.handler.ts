import { IPushOptions, IPushProvider } from '@wolfxlabs/stateless';
import { IPushHandler } from '../interfaces';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export abstract class BasePushHandler implements IPushHandler {
  protected provider: IPushProvider;

  protected constructor(
    private providerId: string,
    private channelType: string,
  ) {}

  canHandle(providerId: string, channelType: ChannelTypeEnum) {
    return providerId === this.providerId && channelType === this.channelType;
  }

  async send(options: IPushOptions) {
    if (process.env.NODE_ENV === 'test') {
      throw new Error(
        'Currently 3rd-party packages test are not support on test env',
      );
    }

    return await this.provider.sendMessage(options);
  }

  abstract buildProvider(credentials: ICredentials);
}
