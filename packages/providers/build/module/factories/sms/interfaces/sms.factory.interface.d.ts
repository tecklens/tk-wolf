import { ISmsHandler } from './sms.handler.interface';
import { IProvider } from '@wolf/stateless';
export interface ISmsFactory {
    getHandler(integration: IProvider): ISmsHandler | null;
}
