import { ICredentials } from '@libs/shared/entities/integration';
import { ChannelTypeEnum } from '@novu/stateless';
// @ts-ignore
import { RyverChatProvider } from '@wolf/ryver';
import { BaseChatHandler } from './base.handler';

export class RyverHandler extends BaseChatHandler {
  constructor() {
    super('ryver', ChannelTypeEnum.CHAT);
  }

  buildProvider(_credentials: ICredentials) {
    this.provider = new RyverChatProvider();
  }
}
