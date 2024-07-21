import { ChannelTypeEnum, ICredentials } from '@stateless/lib/entities';
import { BuilderFieldType, BuilderGroupValues, EnvironmentId, FilterParts } from '@stateless/lib/types';
export interface ICreateProviderDto extends IConstructIntegrationDto {
    providerId: string;
    channel: ChannelTypeEnum;
}
export interface IConstructIntegrationDto {
    name?: string;
    identifier?: string;
    _environmentId?: EnvironmentId;
    credentials?: ICredentials;
    active?: boolean;
    check?: boolean;
    conditions?: {
        isNegated?: boolean;
        type?: BuilderFieldType;
        value?: BuilderGroupValues;
        children?: FilterParts[];
    }[];
}
