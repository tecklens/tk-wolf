import { IChatFactory, IChatHandler } from './interfaces';
import { IProvider } from '@wolf/stateless';
export declare class ChatFactory implements IChatFactory {
    handlers: IChatHandler[];
    getHandler(integration: IProvider): IChatHandler;
}
