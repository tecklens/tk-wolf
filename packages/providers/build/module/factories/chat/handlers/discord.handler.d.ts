import { ICredentials } from '@wolfxlabs/stateless';
import { BaseChatHandler } from './base.handler';
export declare class DiscordHandler extends BaseChatHandler {
    constructor();
    buildProvider(_credentials: ICredentials): void;
}
