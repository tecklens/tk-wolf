import { ISmsOptions, ISmsProvider } from '@wolfxlabs/stateless';
import { ISmsHandler } from '../interfaces';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';
export declare abstract class BaseSmsHandler implements ISmsHandler {
    private providerId;
    private channelType;
    protected provider: ISmsProvider;
    protected constructor(providerId: string, channelType: string);
    getProvider(): ISmsProvider;
    canHandle(providerId: string, channelType: ChannelTypeEnum): boolean;
    send(options: ISmsOptions): Promise<import("@wolfxlabs/stateless").ISendMessageSuccessResponse>;
    abstract buildProvider(credentials: ICredentials): any;
}
