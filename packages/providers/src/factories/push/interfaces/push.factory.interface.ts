import { IPushHandler } from './push.handler.interface';
import { IProvider } from '@wolf/stateless';

export interface IPushFactory {
  getHandler(integration: IProvider): IPushHandler | null;
}
