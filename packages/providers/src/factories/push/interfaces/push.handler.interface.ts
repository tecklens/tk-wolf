import {
  ChannelTypeEnum,
  ICredentials,
  IPushOptions,
  ISendMessageSuccessResponse,
} from '@wolfxlabs/stateless';

export interface IPushHandler {
  canHandle(providerId: string, channelType: ChannelTypeEnum);

  buildProvider(credentials: ICredentials);

  send(smsOptions: IPushOptions): Promise<ISendMessageSuccessResponse>;
}
