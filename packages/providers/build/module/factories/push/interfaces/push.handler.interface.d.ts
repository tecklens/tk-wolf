import { ChannelTypeEnum, ICredentials, IPushOptions, ISendMessageSuccessResponse } from '@wolf/stateless';
export interface IPushHandler {
    canHandle(providerId: string, channelType: ChannelTypeEnum): any;
    buildProvider(credentials: ICredentials): any;
    send(smsOptions: IPushOptions): Promise<ISendMessageSuccessResponse>;
}
