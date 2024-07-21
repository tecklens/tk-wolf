import { BaseChatHandler } from './base.handler';
import { ICredentials } from '@wolfxlabs/stateless';
export declare class GrafanaOnCallHandler extends BaseChatHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
