import { BaseChatHandler } from './base.handler';
import { ICredentials } from '@wolfxlabs/stateless';
export declare class RyverHandler extends BaseChatHandler {
    constructor();
    buildProvider(_credentials: ICredentials): void;
}
