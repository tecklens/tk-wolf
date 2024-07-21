import { IPushFactory, IPushHandler } from './interfaces';
import { IProvider } from '@wolf/stateless';
export declare class PushFactory implements IPushFactory {
    handlers: IPushHandler[];
    getHandler(integration: IProvider): IPushHandler;
}
