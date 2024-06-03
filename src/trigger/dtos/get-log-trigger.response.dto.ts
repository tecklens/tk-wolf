import { ApiProperty } from '@nestjs/swagger';
import { LogEntity } from '@libs/repositories/log/log.entity';

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
