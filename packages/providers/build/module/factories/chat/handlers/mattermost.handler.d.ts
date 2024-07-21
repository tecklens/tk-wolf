import { BaseChatHandler } from './base.handler';
import { ICredentials } from '@wolfxlabs/stateless';
export declare class MattermostHandler extends BaseChatHandler {
    constructor();
    buildProvider(_credentials: ICredentials): void;
}
