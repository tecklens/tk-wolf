import { BaseHandler } from './base.handler';
import { ICredentials } from '@wolf/stateless';
export declare class InfobipEmailHandler extends BaseHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
