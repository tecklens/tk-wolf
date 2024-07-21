import { ApiProperty } from '@nestjs/swagger';
import { LogEntity } from '@libs/repositories/log';

export class GetLogTriggerResponseDto {
  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  data: LogEntity[];

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  page: number;
}
