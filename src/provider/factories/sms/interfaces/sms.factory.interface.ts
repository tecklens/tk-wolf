import { ISmsHandler } from './sms.handler.interface';
import { ProviderEntity } from '@libs/repositories/provider';

export interface ISmsFactory {
  getHandler(integration: ProviderEntity): ISmsHandler | null;
}
