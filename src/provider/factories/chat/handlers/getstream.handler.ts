import { ChannelTypeEnum } from '@novu/stateless';

import { ICredentials } from '@libs/shared/entities/integration';
import { BaseChatHandler } from './base.handler';
import { GetstreamChatProvider } from '@wolf/getstream';

export class GetstreamChatHandler extends BaseChatHandler {
  constructor() {
    super('getstream', ChannelTypeEnum.CHAT);
  }

  buildProvider(credentials: ICredentials) {
    const config: {
      apiKey: string;
    } = {
      apiKey: credentials.apiKey as string,
    };
    this.provider = new GetstreamChatProvider(config);
  }
}
