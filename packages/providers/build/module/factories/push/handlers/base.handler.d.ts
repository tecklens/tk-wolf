import { IPushOptions, IPushProvider } from '@wolfxlabs/stateless';
import { IPushHandler } from '../interfaces';
import { ChannelTypeEnum, ICredentials } from '@wolfxlabs/stateless';
export declare abstract class BasePushHandler implements IPushHandler {
    private providerId;
    private channelType;
    protected provider: IPushProvider;
    protected constructor(providerId: string, channelType: string);
    canHandle(providerId: string, channelType: ChannelTypeEnum): boolean;
    send(options: IPushOptions): Promise<import("@wolfxlabs/stateless").ISendMessageSuccessResponse>;
    abstract buildProvider(credentials: ICredentials): any;
}
