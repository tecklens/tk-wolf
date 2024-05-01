import { IConstructIntegrationDto } from './construct-integration.interface';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';

export interface ICreateProviderBodyDto extends IConstructIntegrationDto {
  providerId: string;
  channel: ChannelTypeEnum;
}
