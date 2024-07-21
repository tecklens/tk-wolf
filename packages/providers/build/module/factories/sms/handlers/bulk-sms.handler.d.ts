import { BaseSmsHandler } from './base.handler';
import { ICredentials } from '@wolfxlabs/stateless';
export declare class BulkSmsHandler extends BaseSmsHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
