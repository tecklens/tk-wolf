import { ChannelTypeEnum, IEmailOptions, IEmailProvider } from '@wolfxlabs/stateless';
import { IMailHandler } from '../interfaces';
export declare abstract class BaseHandler implements IMailHandler {
    private providerId;
    private channelType;
    protected provider: IEmailProvider;
    protected constructor(providerId: string, channelType: string);
    canHandle(providerId: string, channelType: ChannelTypeEnum): boolean;
    abstract buildProvider(credentials: any, options: any): any;
    send(mailData: IEmailOptions): Promise<import("@wolfxlabs/stateless").ISendMessageSuccessResponse>;
    getProvider(): IEmailProvider;
    check(): Promise<{
        success: true;
        code: import("@wolfxlabs/stateless").CheckIntegrationResponseEnum;
        message: string;
    }>;
}
