import { WorkflowId } from '@libs/repositories/workflow/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTriggerDto {
  @ApiProperty()
  @IsString()
  workflowId: WorkflowId;
  @ApiProperty()
  target: ITargetTrigger;

  @ApiPropertyOptional()
  overrides?: IOverridesDataTrigger;
}

export interface ITargetTrigger {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  locale: string;
}

export class SmSTriggerDto {
  @ApiProperty()
  @IsString()
  to: string;

  @ApiPropertyOptional()
  @IsString()
  from?: string;

  @ApiPropertyOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional()
  variables?: Record<string, string>;
}

export interface IOverridesDataTrigger {
  content?: string;
  to?: string;
  from?: string;
  customData?: any;
}
