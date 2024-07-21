import { BaseChatHandler } from './base.handler';
import { ICredentials } from '@wolf/stateless';
export declare class RocketChatHandler extends BaseChatHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
