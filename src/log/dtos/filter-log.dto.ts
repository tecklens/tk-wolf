import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class FilterLogDto {
  @ApiProperty()
  @IsString()
  event_type: string;

  @ApiProperty()
  @IsString()
  @IsIn(['month', 'day', 'hour'])
  period: 'month' | 'day' | 'hour';
}
