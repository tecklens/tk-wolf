import { BaseHandler } from './base.handler';
import { ICredentials } from '@wolfxlabs/stateless';
export declare class EmailWebhookHandler extends BaseHandler {
    constructor();
    buildProvider(credentials: ICredentials, from: string): void;
}
