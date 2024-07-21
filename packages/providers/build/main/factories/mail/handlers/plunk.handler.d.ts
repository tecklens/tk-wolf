import { ICredentials } from '@wolf/stateless';
import { BaseHandler } from './base.handler';
export declare class PlunkHandler extends BaseHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
