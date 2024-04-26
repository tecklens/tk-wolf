import { IChatOptions, IChatProvider } from '@novu/stateless';
import { IChatHandler } from '../interfaces';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';

export abstract class BaseChatHandler implements IChatHandler {
  protected provider: IChatProvider;

  protected constructor(
    private providerId: string,
    private channelType: string,
  ) {}

  canHandle(providerId: string, channelType: ChannelTypeEnum) {
    return providerId === this.providerId && channelType === this.channelType;
  }

  abstract buildProvider(credentials);

  async send(chatContent: IChatOptions) {
    if (process.env.NODE_ENV === 'test') {
      return {};
    }

    return await this.provider.sendMessage(chatContent);
  }
}
