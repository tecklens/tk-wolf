import { BaseSmsHandler } from './base.handler';
import { ICredentials } from '@wolf/stateless';
export declare class MessageBirdHandler extends BaseSmsHandler {
    constructor();
    buildProvider(credentials: ICredentials): void;
}
