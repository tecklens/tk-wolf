import { BaseSmsHandler } from './base.handler';
import { ICredentials } from '@wolfxlabs/stateless';
export declare class BandwidthHandler extends BaseSmsHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
