import {
  ChannelTypeEnum,
  IChatOptions,
  ICredentials,
  IProvider,
  ISendMessageSuccessResponse,
} from '@wolfxlabs/stateless';

export interface IChatHandler {
  canHandle(providerId: string, channelType: ChannelTypeEnum);
  buildProvider(credentials: ICredentials);
  send(chatData: IChatOptions): Promise<ISendMessageSuccessResponse>;
}

export interface IChatFactory {
  getHandler(integration: IProvider): IChatHandler | null;
}
