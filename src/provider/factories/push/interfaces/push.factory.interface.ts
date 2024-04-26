import { IPushHandler } from '@app/provider/factories';
import { ProviderEntity } from '@libs/repositories/provider';

export interface IPushFactory {
  getHandler(integration: ProviderEntity): IPushHandler | null;
}
