import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';
import { Constructor } from '@nestjs/common/utils/merge-with-values.util';
import { IPaginationParams } from '@stateless/lib/types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function PaginationRequestDto(
  defaultLimit = 10,
  maxLimit = 100,
): Constructor<IPaginationParams> {
  class PaginationRequest {
    @ApiPropertyOptional({
      type: Number,
      required: false,
    })
    @Type(() => Number)
    @IsInt()
    page = 0;

    @ApiPropertyOptional({
      type: Number,
      required: false,
      default: defaultLimit,
      maximum: maxLimit,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(maxLimit)
    limit = defaultLimit;
  }

  return PaginationRequest;
}
