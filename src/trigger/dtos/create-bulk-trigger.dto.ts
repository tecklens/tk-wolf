import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMaxSize, IsString } from 'class-validator';
import {
  IOverridesDataTrigger,
  ITargetTrigger,
  WorkflowId,
} from '@wolf/stateless';

export class CreateBulkTriggerDto {
  @ApiProperty()
  @IsString()
  workflowId: WorkflowId;
  @ApiProperty()
  @ArrayMaxSize(100, {
    each: true,
    message: 'The limit for a request is 100 targets.',
  })
  targets: ITargetTrigger[];

  @ApiPropertyOptional()
  overrides?: IOverridesDataTrigger;
}
