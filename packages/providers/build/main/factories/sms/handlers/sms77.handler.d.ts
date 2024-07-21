import { BaseSmsHandler } from './base.handler';
import { ICredentials } from '@wolf/stateless';
export declare class Sms77Handler extends BaseSmsHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
