import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WorkflowId } from '@wolfxlabs/stateless';

export class UpdateViewPortWorkflowRequestDto {
  @ApiProperty()
  @IsString()
  workflowId: WorkflowId;

  @ApiProperty()
  @IsNumber()
  x: number;

  @ApiProperty()
  @IsNumber()
  y: number;

  @ApiProperty()
  @IsNumber()
  zoom: number;
}
