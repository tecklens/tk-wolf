import { ICredentials } from '@wolf/stateless';
import { BaseChatHandler } from './base.handler';
export declare class GetstreamChatHandler extends BaseChatHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
