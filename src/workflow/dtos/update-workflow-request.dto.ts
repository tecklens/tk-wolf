import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IUpdateWorkflowDto, WorkflowId } from '@wolfxlabs/stateless';

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
