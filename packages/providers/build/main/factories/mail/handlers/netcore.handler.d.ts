import { ICredentials } from '@wolf/stateless';
import { BaseHandler } from './base.handler';
export declare class NetCoreHandler extends BaseHandler {
    constructor();
    buildProvider(credentials: ICredentials, from?: string): void;
}
