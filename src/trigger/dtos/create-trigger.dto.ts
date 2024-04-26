import { WorkflowId } from '@libs/repositories/workflow/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTriggerDto implements IDataTrigger {
  @ApiProperty()
  @IsString()
  workflowId: WorkflowId;
  @ApiProperty()
  target: ITargetTrigger;
  @ApiPropertyOptional()
  data: IDataTrigger;
}

export interface IDataTrigger {
  workflowId: WorkflowId;
  target: ITargetTrigger;
  data: IDataTrigger;
}

export interface ITargetTrigger {
  subcriberId: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  locale: string;
}
