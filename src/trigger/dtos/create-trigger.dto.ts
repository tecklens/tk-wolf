import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  IOverridesDataTrigger,
  ITargetTrigger,
  WorkflowId,
} from '@wolf/stateless';

export class CreateTriggerDto {
  @ApiProperty()
  @IsString()
  workflowId: WorkflowId;
  @ApiProperty()
  target: ITargetTrigger;

  @ApiPropertyOptional()
  overrides?: IOverridesDataTrigger;
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
