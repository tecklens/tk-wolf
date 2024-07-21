import {
  ChannelTypeEnum,
  ICredentials,
  IPushOptions,
  ISendMessageSuccessResponse,
} from '@wolf/stateless';

export interface IPushHandler {
  canHandle(providerId: string, channelType: ChannelTypeEnum);

  buildProvider(credentials: ICredentials);

  send(smsOptions: IPushOptions): Promise<ISendMessageSuccessResponse>;
}
