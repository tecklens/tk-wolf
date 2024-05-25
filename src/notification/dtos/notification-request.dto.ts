import { PaginationWithFiltersRequestDto } from '@libs/shared/dto/pagination-with-filters-request';

export class NotificationsRequestDto extends PaginationWithFiltersRequestDto({
  defaultLimit: 10,
  maxLimit: 100,
  queryDescription:
    'It allows filtering based on either the name or trigger identifier of the workflow items.',
}) {}
