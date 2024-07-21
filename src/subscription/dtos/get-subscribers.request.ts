import { PaginationWithFiltersRequestDto } from '@libs/shared/dto/pagination-with-filters-request';

export class GetSubscriptionsRequest extends PaginationWithFiltersRequestDto({
  defaultLimit: 10,
  maxLimit: 100,
  queryDescription: 'It allows filtering.',
}) {}
