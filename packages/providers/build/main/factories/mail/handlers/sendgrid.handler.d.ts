import { BaseHandler } from './base.handler';
export declare class SendgridHandler extends BaseHandler {
    constructor();
    buildProvider(credentials: any, from?: string): void;
}
