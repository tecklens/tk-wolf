import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SubmitBugRequestDto {
  @ApiProperty()
  @IsString()
  title: boolean;

  @ApiProperty()
  @IsString()
  description: boolean;
}
