import { chatProviders, emailProviders, smsProviders, pushProviders, inAppProviders, } from './channels';
import { InAppProviderIdEnum, EmailProviderIdEnum, SmsProviderIdEnum, } from './provider.enum';
export { chatProviders, emailProviders, smsProviders, pushProviders, inAppProviders, } from './channels';
export const providers = [
    ...emailProviders,
    ...smsProviders,
    ...chatProviders,
    ...pushProviders,
    ...inAppProviders,
];
export const WOLF_PROVIDERS = [
    InAppProviderIdEnum.Novu,
    SmsProviderIdEnum.Novu,
    EmailProviderIdEnum.Novu,
];
export const WOLF_SMS_EMAIL_PROVIDERS = [
    SmsProviderIdEnum.Novu,
    EmailProviderIdEnum.Novu,
];
//# sourceMappingURL=providers.js.map