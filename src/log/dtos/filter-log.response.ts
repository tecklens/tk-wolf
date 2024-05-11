import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';
import { PaginationWithFiltersRequestDto } from '@libs/shared/dto/pagination-with-filters-request';

export class FilterLogResponse {
  data: Record<string, number>[];
}
