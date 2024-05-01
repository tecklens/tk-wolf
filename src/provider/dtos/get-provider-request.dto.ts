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
import { Transform, Type } from 'class-transformer';

import { CredentialsDto } from './credentials.dto';
import { ICreateProviderBodyDto } from '@libs/shared/dto';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import { StepFilter } from '@libs/shared/dto/step-filter';

export class GetProviderRequestDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  providerId?: string;

  @ApiProperty({
    enum: ChannelTypeEnum,
  })
  @IsOptional()
  @IsEnum(ChannelTypeEnum)
  channel?: ChannelTypeEnum;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  active?: boolean;

  @IsOptional()
  @IsBoolean()
  findOne?: boolean;
}
