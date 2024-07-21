import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Constructor } from '@nestjs/common/utils/merge-with-values.util';
import { IPaginationWithQueryParams } from '@stateless/lib/types';
import { PaginationRequestDto } from '@stateless/lib/dto/pagination-request';

export function PaginationWithFiltersRequestDto({
  defaultLimit = 10,
  maxLimit = 100,
  queryDescription,
}: {
  defaultLimit: number;
  maxLimit: number;
  queryDescription: string;
}): Constructor<IPaginationWithQueryParams> {
  class PaginationWithFiltersRequest extends PaginationRequestDto(
    defaultLimit,
    maxLimit,
  ) {
    @ApiPropertyOptional({
      type: String,
      required: false,
      description: `A query string to filter the results. ${queryDescription}`,
    })
    @IsOptional()
    @IsString()
    query?: string;
  }

  return PaginationWithFiltersRequest;
}
