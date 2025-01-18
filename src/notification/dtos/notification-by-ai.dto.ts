import {
  PaginationWithFiltersRequestDto,
  SubscriberId,
} from '@wolfxlabs/stateless';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class NotificationByAiDto extends PaginationWithFiltersRequestDto({
  defaultLimit: 10,
  maxLimit: 100,
  queryDescription:
    'It allows filtering based on either the name or trigger identifier of the workflow items.',
}) {
  page: number;
  limit: number;

  @ApiProperty()
  @IsString()
  @IsDefined()
  subscriberId: SubscriberId;

  @ApiProperty()
  @IsString()
  @IsDefined()
  applicationIdentifier: string;
}
