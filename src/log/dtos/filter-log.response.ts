import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class FilterLogResponse {
  data: Record<string, number>[];
}
