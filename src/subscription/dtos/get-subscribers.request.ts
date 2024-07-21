import { PaginationWithFiltersRequestDto } from '@wolf/stateless';

export class GetSubscribersRequest extends PaginationWithFiltersRequestDto({
  defaultLimit: 10,
  maxLimit: 100,
  queryDescription: 'It allows filtering.',
}) {
  page: number;
  limit: number;
}