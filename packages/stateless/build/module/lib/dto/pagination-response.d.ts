import { IPaginatedResponseDto } from '../dto';
export declare class PaginatedResponseDto<T> implements IPaginatedResponseDto<T> {
    page: number;
    hasMore: boolean;
    pageSize: number;
    data: T[];
}
