import { BaseSmsHandler } from './base.handler';
import { ICredentials } from '@wolf/stateless';
export declare class PlivoHandler extends BaseSmsHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
