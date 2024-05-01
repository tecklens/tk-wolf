import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { CredentialsDto } from './credentials.dto';
import { ICreateProviderBodyDto } from '@libs/shared/dto';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import { StepFilter } from '@libs/shared/dto/step-filter';

export class CreateProviderRequestDto implements ICreateProviderBodyDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  identifier?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsMongoId()
  _environmentId?: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  providerId: string;

  @ApiProperty({
    enum: ChannelTypeEnum,
  })
  @IsDefined()
  @IsEnum(ChannelTypeEnum)
  channel: ChannelTypeEnum;

  @ApiPropertyOptional({
    type: CredentialsDto,
  })
  @IsOptional()
  @Type(() => CredentialsDto)
  @ValidateNested()
  credentials?: CredentialsDto;

  @ApiPropertyOptional({
    type: Boolean,
    description:
      'If the integration is active the validation on the credentials field will run',
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  check?: boolean;

  @ApiPropertyOptional({
    type: [StepFilter],
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  conditions?: StepFilter[];
}
