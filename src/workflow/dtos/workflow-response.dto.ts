import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IEdgeEntity, INodeEntity } from '@wolfxlabs/stateless';

export class WorkflowResponse {
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

  @ApiProperty()
  identifier: string;

  viewport: any;
}
