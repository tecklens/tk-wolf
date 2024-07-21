import { IMailHandler } from './interfaces/send.handler.interface';
import { IProvider } from '@wolf/stateless';
export declare class MailFactory {
    handlers: IMailHandler[];
    getHandler(integration: Pick<IProvider, 'credentials' | 'channel' | 'providerId'>, from?: string): IMailHandler;
}
