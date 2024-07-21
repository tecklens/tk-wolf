import { BaseSmsHandler } from './base.handler';
import { ICredentials } from '@wolfxlabs/stateless';
export declare class MaqsamHandler extends BaseSmsHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
