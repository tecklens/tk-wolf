import { ICredentials } from '@wolf/stateless';
import { BaseChatHandler } from './base.handler';
export declare class DiscordHandler extends BaseChatHandler {
    constructor();
    buildProvider(_credentials: ICredentials): void;
}
