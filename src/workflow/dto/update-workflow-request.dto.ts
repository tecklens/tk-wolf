import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WorkflowId } from '@libs/repositories/workflow/types';
import { IUpdateWorkflowDto } from '@libs/shared/dto';

export class UpdateWorkflowRequestDto implements IUpdateWorkflowDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  workflowId: WorkflowId;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(300)
  description: string;
}
