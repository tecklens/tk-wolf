import { IPushFactory, IPushHandler } from './interfaces';
import { IProvider } from '@wolfxlabs/stateless';
export declare class PushFactory implements IPushFactory {
    handlers: IPushHandler[];
    getHandler(integration: IProvider): IPushHandler;
}
