import { IChatHandler } from '../interfaces';
import { ChannelTypeEnum, IChatOptions, IChatProvider } from '@wolf/stateless';
export declare abstract class BaseChatHandler implements IChatHandler {
    private providerId;
    private channelType;
    protected provider: IChatProvider;
    protected constructor(providerId: string, channelType: string);
    canHandle(providerId: string, channelType: ChannelTypeEnum): boolean;
    abstract buildProvider(credentials: any): any;
    send(chatContent: IChatOptions): Promise<import("@wolf/stateless").ISendMessageSuccessResponse>;
}
