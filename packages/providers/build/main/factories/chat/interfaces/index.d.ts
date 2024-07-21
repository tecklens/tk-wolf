import { ChannelTypeEnum, IChatOptions, ICredentials, IProvider, ISendMessageSuccessResponse } from '@wolfxlabs/stateless';
export interface IChatHandler {
    canHandle(providerId: string, channelType: ChannelTypeEnum): any;
    buildProvider(credentials: ICredentials): any;
    send(chatData: IChatOptions): Promise<ISendMessageSuccessResponse>;
}
export interface IChatFactory {
    getHandler(integration: IProvider): IChatHandler | null;
}
