import { ISmsHandler } from './sms.handler.interface';
import { IProvider } from '@wolfxlabs/stateless';

export interface ISmsFactory {
  getHandler(integration: IProvider): ISmsHandler | null;
}
