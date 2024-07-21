import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from '@libs/repositories/task';

export class TaskResponseDto {
  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  data: TaskEntity[];

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  page: number;
}
