import { ChannelTypeEnum, ICredentials, IPushOptions, ISendMessageSuccessResponse } from '@wolfxlabs/stateless';
export interface IPushHandler {
    canHandle(providerId: string, channelType: ChannelTypeEnum): any;
    buildProvider(credentials: ICredentials): any;
    send(smsOptions: IPushOptions): Promise<ISendMessageSuccessResponse>;
}
