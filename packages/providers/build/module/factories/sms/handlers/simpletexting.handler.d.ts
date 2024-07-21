import { BaseSmsHandler } from './base.handler';
import { ICredentials } from '@wolf/stateless';
export declare class SimpletextingSmsHandler extends BaseSmsHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
