import { ISmsOptions, ISmsProvider } from '@novu/stateless';
import { ISmsHandler } from '../interfaces';
import { ChannelTypeEnum, ICredentials } from '@wolf/stateless';
export declare abstract class BaseSmsHandler implements ISmsHandler {
    private providerId;
    private channelType;
    protected provider: ISmsProvider;
    protected constructor(providerId: string, channelType: string);
    getProvider(): ISmsProvider;
    canHandle(providerId: string, channelType: ChannelTypeEnum): boolean;
    send(options: ISmsOptions): Promise<import("@novu/stateless").ISendMessageSuccessResponse>;
    abstract buildProvider(credentials: ICredentials): any;
}
