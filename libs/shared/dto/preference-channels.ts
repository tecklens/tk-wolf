import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { IPreferenceChannels } from '@tps/subscriber-preference.interface';

export class PreferenceChannels implements IPreferenceChannels {
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  email?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  sms?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  in_app?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  chat?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  push?: boolean;
}
