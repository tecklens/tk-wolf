import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateWorkflowDto } from '@libs/shared/dto';

export class DelEleWorkflowRequestDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty({ message: 'Id Workflow is required' })
  workflowId: string;

  nodeIds: string[];
  edgeIds: string[];
}
