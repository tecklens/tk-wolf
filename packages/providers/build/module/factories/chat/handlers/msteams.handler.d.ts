import { BaseChatHandler } from './base.handler';
import { ICredentials } from '@wolf/stateless';
export declare class MSTeamsHandler extends BaseChatHandler {
    constructor();
    buildProvider(_credentials: ICredentials): void;
}
