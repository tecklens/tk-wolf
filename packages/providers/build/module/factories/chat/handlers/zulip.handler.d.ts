import { BaseChatHandler } from './base.handler';
import { ICredentials } from '@wolf/stateless';
export declare class ZulipHandler extends BaseChatHandler {
    constructor();
    buildProvider(_credentials: ICredentials): void;
}
