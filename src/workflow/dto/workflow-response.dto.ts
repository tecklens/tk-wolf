import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IWfTemplate } from '@libs/shared/entities/wf-template';
import { INodeEntity } from '@libs/shared/entities/workflow/node.interface';
import { IEdgeEntity } from '@libs/shared/entities/workflow/edge.interface';

export class WorkflowResponse implements IWfTemplate {
  @ApiPropertyOptional()
  _id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  _organizationId: string;
  @ApiProperty()
  _userId: string;

  @ApiProperty()
  _environmentId: string;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  deletedAt: string;

  @ApiProperty()
  deletedBy: string;

  @ApiPropertyOptional()
  nodes?: INodeEntity[];

  @ApiPropertyOptional()
  edges?: IEdgeEntity[];
}
