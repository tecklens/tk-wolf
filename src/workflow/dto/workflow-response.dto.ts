import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IWfTemplate,
  TriggerTypeEnum,
} from '@libs/shared/entities/wf-template';

class NotificationGroup {
  @ApiPropertyOptional()
  _id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  _environmentId: string;

  @ApiProperty()
  _organizationId: string;

  @ApiPropertyOptional()
  _parentId?: string;
}

class NotificationTriggerVariable {
  name: string;
}

class NotificationTrigger {
  @ApiProperty()
  type: TriggerTypeEnum;

  @ApiProperty()
  identifier: string;

  @ApiProperty({
    type: [NotificationTriggerVariable],
  })
  variables: NotificationTriggerVariable[];

  @ApiProperty({
    type: [NotificationTriggerVariable],
  })
  subscriberVariables?: NotificationTriggerVariable[];
}

@ApiExtraModels(NotificationGroup)
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
}
