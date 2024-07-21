import { MessageBirdSmsProvider } from '@wolfxlabs/messagebird';
import { BaseSmsHandler } from './base.handler';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';

export class MessageBirdHandler extends BaseSmsHandler {
  constructor() {
    super('messagebird', ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new MessageBirdSmsProvider({
      access_key: credentials.accessKey,
    });
  }
}
