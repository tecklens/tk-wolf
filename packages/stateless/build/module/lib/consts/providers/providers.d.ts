import { IProviderConfig } from './provider.interface';
import { ProvidersIdEnum } from './provider.enum';
export { chatProviders, emailProviders, smsProviders, pushProviders, inAppProviders, } from './channels';
export declare const providers: IProviderConfig[];
export declare const WOLF_PROVIDERS: ProvidersIdEnum[];
export declare const WOLF_SMS_EMAIL_PROVIDERS: ProvidersIdEnum[];
