import { BaseChatHandler } from './base.handler';
import { ICredentials } from '@wolf/stateless';
export declare class RyverHandler extends BaseChatHandler {
    constructor();
    buildProvider(_credentials: ICredentials): void;
}
