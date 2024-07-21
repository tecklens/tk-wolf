import { BasePushHandler } from './base.handler';
import { ICredentials } from '@wolfxlabs/stateless';
export declare class ExpoHandler extends BasePushHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
