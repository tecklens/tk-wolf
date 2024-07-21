import { ICredentials } from '@wolfxlabs/stateless';
import { BaseChatHandler } from './base.handler';
export declare class TelegramHandler extends BaseChatHandler {
    constructor();
    buildProvider(_: ICredentials): void;
}
