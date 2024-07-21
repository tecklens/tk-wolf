import { ICredentials } from '@wolfxlabs/stateless';
import { BaseHandler } from './base.handler';
export declare class SendinblueHandler extends BaseHandler {
    constructor();
    buildProvider(credentials: ICredentials, from?: string): void;
}
