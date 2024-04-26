import { IConstructIntegrationDto } from './construct-integration.interface';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';

export interface ICreateIntegrationBodyDto extends IConstructIntegrationDto {
  providerId: string;
  channel: ChannelTypeEnum;
}
