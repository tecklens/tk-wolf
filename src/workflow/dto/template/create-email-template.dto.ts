import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEmailTemplateDto {
  @ApiProperty()
  @IsString()
  preview: string;
  @ApiProperty()
  @IsString()
  name: string;
  identifier: string;
  @ApiProperty()
  @IsString()
  design: any;
  free: boolean;
}
