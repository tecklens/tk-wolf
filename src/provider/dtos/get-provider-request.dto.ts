import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ChannelTypeEnum } from '@wolf/stateless';

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
