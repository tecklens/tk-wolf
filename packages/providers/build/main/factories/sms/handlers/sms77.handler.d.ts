import { BaseSmsHandler } from './base.handler';
import { ICredentials } from '@wolfxlabs/stateless';
export declare class Sms77Handler extends BaseSmsHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
