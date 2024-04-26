import { IsObject, IsArray, IsString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UpdateBrandingDetailsDto } from './update-branding-details.dto';

export class IPartnerConfigurationResponseDto {
  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  projectIds?: string[];

  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsString()
  configurationId: string;

  @ApiPropertyOptional()
  @IsString()
  teamId: string;
}

export class OrganizationBrandingResponseDto extends UpdateBrandingDetailsDto {}

export class OrganizationResponseDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  logo?: string;

  @ApiProperty()
  @IsObject()
  branding: OrganizationBrandingResponseDto;

  @ApiPropertyOptional()
  @IsObject()
  partnerConfigurations: IPartnerConfigurationResponseDto[];
}
