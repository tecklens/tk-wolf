import { IEmailProvider, ISmsProvider, IChatProvider, IPushProvider, ChannelTypeEnum } from './provider.interface';
export declare class ProviderStore {
    private providers;
    addProvider(providerId: string, provider: IEmailProvider | ISmsProvider | IChatProvider | IPushProvider): Promise<void>;
    getProviderById(providerId: string): Promise<IEmailProvider | ISmsProvider | IChatProvider | IPushProvider>;
    getProviderByInternalId(providerId: string): Promise<IEmailProvider | ISmsProvider | IChatProvider | IPushProvider>;
    getProviderByChannel(channel: ChannelTypeEnum): Promise<IEmailProvider | ISmsProvider | IChatProvider | IPushProvider>;
    getProviders(): Promise<(IEmailProvider | ISmsProvider | IChatProvider | IPushProvider)[]>;
}
