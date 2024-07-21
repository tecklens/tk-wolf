import { BaseSmsHandler } from './base.handler';
import { ICredentials } from '@wolfxlabs/stateless';
export declare class TermiiSmsHandler extends BaseSmsHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
