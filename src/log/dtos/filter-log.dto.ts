import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';
import { PaginationWithFiltersRequestDto } from '@wolfxlabs/stateless';

export class FilterLogDto extends PaginationWithFiltersRequestDto({
  defaultLimit: 10,
  maxLimit: 100,
  queryDescription: 'It allows filtering.',
}) {
  @ApiProperty()
  @IsString()
  event_type: string;

  @ApiProperty()
  @IsString()
  @IsIn(['month', 'day', 'hour'])
  period: 'month' | 'day' | 'hour';

  page: number;
  limit: number;
}
