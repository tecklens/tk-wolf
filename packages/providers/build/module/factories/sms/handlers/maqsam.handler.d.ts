import { BaseSmsHandler } from './base.handler';
import { ICredentials } from '@wolf/stateless';
export declare class MaqsamHandler extends BaseSmsHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
