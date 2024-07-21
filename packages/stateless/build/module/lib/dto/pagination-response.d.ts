import { IPaginatedResponseDto } from '@stateless/lib/dto/shared';
export declare class PaginatedResponseDto<T> implements IPaginatedResponseDto<T> {
    page: number;
    hasMore: boolean;
    pageSize: number;
    data: T[];
}
