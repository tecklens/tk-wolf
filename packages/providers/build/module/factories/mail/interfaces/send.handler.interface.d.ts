import { ChannelTypeEnum, ICheckIntegrationResponse, ICredentials, IEmailOptions, IEmailProvider, ISendMessageSuccessResponse } from '@wolfxlabs/stateless';
export interface IMailHandler {
    canHandle(providerId: string, channelType: ChannelTypeEnum): any;
    buildProvider(credentials: ICredentials, from?: string): any;
    send(mailData: IEmailOptions): Promise<ISendMessageSuccessResponse>;
    getProvider(): IEmailProvider;
    check(): Promise<ICheckIntegrationResponse>;
}
