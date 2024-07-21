import {
  ChannelTypeEnum,
  ICredentials,
  ISendMessageSuccessResponse,
  ISmsOptions,
  ISmsProvider,
} from '@wolfxlabs/stateless';

export interface ISmsHandler {
  canHandle(providerId: string, channelType: ChannelTypeEnum);

  buildProvider(credentials: ICredentials);

  send(smsOptions: ISmsOptions): Promise<ISendMessageSuccessResponse>;

  getProvider(): ISmsProvider;
}
