import { ICredentials } from '@wolfxlabs/stateless';
import { BaseHandler } from './base.handler';
export declare class Outlook365Handler extends BaseHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
