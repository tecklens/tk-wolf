import { ISmsFactory, ISmsHandler } from './interfaces';
import { IProvider } from '@wolf/stateless';
export declare class SmsFactory implements ISmsFactory {
    handlers: ISmsHandler[];
    getHandler(integration: IProvider): ISmsHandler;
}
