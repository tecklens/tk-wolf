import { ChannelTypeEnum, ICredentials, ISendMessageSuccessResponse, ISmsOptions, ISmsProvider } from '@wolf/stateless';
export interface ISmsHandler {
    canHandle(providerId: string, channelType: ChannelTypeEnum): any;
    buildProvider(credentials: ICredentials): any;
    send(smsOptions: ISmsOptions): Promise<ISendMessageSuccessResponse>;
    getProvider(): ISmsProvider;
}
