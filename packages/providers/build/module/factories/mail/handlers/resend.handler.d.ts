import { ICredentials } from '@wolfxlabs/stateless';
import { BaseHandler } from './base.handler';
export declare class ResendHandler extends BaseHandler {
    constructor();
    buildProvider(credentials: ICredentials, from?: string): void;
}
