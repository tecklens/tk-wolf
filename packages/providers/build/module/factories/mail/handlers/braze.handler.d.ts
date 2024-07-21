import { BaseHandler } from './base.handler';
import { ICredentials } from '@wolf/stateless';
export declare class BrazeEmailHandler extends BaseHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
