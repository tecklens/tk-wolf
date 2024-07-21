import { BaseHandler } from './base.handler';
import { ICredentials } from '@wolf/stateless';
export declare class MailtrapHandler extends BaseHandler {
    constructor();
    buildProvider(credentials: ICredentials, from: string): void;
}
