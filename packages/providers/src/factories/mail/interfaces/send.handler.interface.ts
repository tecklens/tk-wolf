import {
  ChannelTypeEnum,
  ICheckIntegrationResponse,
  ICredentials,
  IEmailOptions,
  IEmailProvider,
  ISendMessageSuccessResponse,
} from '@wolf/stateless';

export interface IMailHandler {
  canHandle(providerId: string, channelType: ChannelTypeEnum);

  buildProvider(credentials: ICredentials, from?: string);

  send(mailData: IEmailOptions): Promise<ISendMessageSuccessResponse>;

  getProvider(): IEmailProvider;

  check(): Promise<ICheckIntegrationResponse>;
}
