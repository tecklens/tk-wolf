import { BasePushHandler } from './base.handler';
import { ICredentials } from '@wolf/stateless';
export declare class OneSignalHandler extends BasePushHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
