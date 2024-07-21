import { BasePushHandler } from './base.handler';
import { ICredentials } from '@wolfxlabs/stateless';
export declare class PusherBeamsHandler extends BasePushHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
