import { BasePushHandler } from './base.handler';
import { ICredentials } from '@wolf/stateless';
export declare class ExpoHandler extends BasePushHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
