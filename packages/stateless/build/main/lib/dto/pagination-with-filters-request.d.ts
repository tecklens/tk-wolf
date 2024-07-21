import { Constructor } from '@nestjs/common/utils/merge-with-values.util';
import { IPaginationWithQueryParams } from '../types';
export declare function PaginationWithFiltersRequestDto({ defaultLimit, maxLimit, queryDescription, }: {
    defaultLimit: number;
    maxLimit: number;
    queryDescription: string;
}): Constructor<IPaginationWithQueryParams>;