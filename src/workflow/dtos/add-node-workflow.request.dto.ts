import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateWorkflowDto } from '@libs/shared/dto';

export class AddNodeWorkflowRequestDto implements ICreateWorkflowDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty({ message: 'Id Workflow is required' })
  workflowId: string;
  name: string;
  tags: string[];
}
