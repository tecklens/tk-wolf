import { ISmsOptions, ISmsProvider } from '@wolfxlabs/stateless';
import { ISmsHandler } from '../interfaces';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export abstract class BaseSmsHandler implements ISmsHandler {
  protected provider: ISmsProvider;

  protected constructor(
    private providerId: string,
    private channelType: string,
  ) {}

  getProvider(): ISmsProvider {
    return this.provider;
  }

  canHandle(providerId: string, channelType: ChannelTypeEnum) {
    return providerId === this.providerId && channelType === this.channelType;
  }

  async send(options: ISmsOptions) {
    if (process.env.NODE_ENV === 'test') {
      throw new Error(
        'Currently 3rd-party packages test are not support on test env',
      );
    }

    return await this.provider.sendMessage(options);
  }

  abstract buildProvider(credentials: ICredentials);
}
