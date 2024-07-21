import { ICredentials } from '@wolf/stateless';
import { BaseChatHandler } from './base.handler';
export declare class SlackHandler extends BaseChatHandler {
    constructor();
    buildProvider(_: ICredentials): void;
}
