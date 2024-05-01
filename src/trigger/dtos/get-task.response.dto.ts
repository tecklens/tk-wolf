import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from '@libs/repositories/task/task.entity';

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
