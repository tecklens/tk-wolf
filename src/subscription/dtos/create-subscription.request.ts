import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSubscriptionRequest {
  @ApiProperty()
  @IsString()
  email: string;
  @ApiPropertyOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsString()
  firstName?: string;
  @ApiPropertyOptional()
  @IsString()
  lastName?: string;
  @ApiPropertyOptional()
  @IsString()
  locale?: string;
  @ApiPropertyOptional()
  overrides?: any;
}
