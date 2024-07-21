import { IPushHandler } from './push.handler.interface';
import { IProvider } from '@wolfxlabs/stateless';

export interface IPushFactory {
  getHandler(integration: IProvider): IPushHandler | null;
}
