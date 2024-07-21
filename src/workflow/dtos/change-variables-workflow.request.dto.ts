import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChangeVariablesWorkflowRequestDto {
  @ApiPropertyOptional()
  @IsString()
  _id: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty({ message: 'Id Workflow is required' })
  workflowId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Variable name is required' })
  name: string;

  @ApiProperty()
  @IsString()
  type: string;
  @ApiProperty()
  @IsString()
  defaultValue: string;

  @ApiProperty()
  @IsString()
  required: boolean;
}
