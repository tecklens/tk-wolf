import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateWorkflowDto } from '@libs/shared/dto';

export class ChangeVariablesWorkflowRequestDto {
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
}
