import { BaseChatHandler } from './base.handler';
import { ICredentials } from '@wolfxlabs/stateless';
export declare class RocketChatHandler extends BaseChatHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
