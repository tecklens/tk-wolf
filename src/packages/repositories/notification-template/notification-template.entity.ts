import { Types } from 'mongoose';

import type { OrganizationId } from '../organization';
import type { ChangePropsValueType, EnvironmentId } from '../environment';
import { IWorkflowStepMetadata } from '@config/util-enum';
import { BuilderFieldType, BuilderGroupValues } from '@tps/builder.types';
import { FilterParts } from '@tps/filter.types';
import { NotificationGroupEntity } from '@pak/repositories/notification-group';

export class NotificationTemplateEntity {
  _id: string;

  name: string;

  description: string;

  active: boolean;

  draft: boolean;

  // preferenceSettings: IPreferenceChannels;

  critical: boolean;

  tags: string[];

  steps: NotificationStepEntity[];

  _organizationId: OrganizationId;

  _creatorId: string;

  _environmentId: EnvironmentId;

  // triggers: NotificationTriggerEntity[];

  _notificationGroupId: string;

  _parentId?: string;

  deleted: boolean;

  deletedAt: string;

  deletedBy: string;

  createdAt?: string;

  updatedAt?: string;

  readonly notificationGroup?: NotificationGroupEntity;

  isBlueprint: boolean;

  blueprintId?: string;

  // data?: NotificationTemplateCustomData;
}

export type NotificationTemplateDBModel = ChangePropsValueType<
  Omit<NotificationTemplateEntity, '_parentId'>,
  '_environmentId' | '_organizationId' | '_creatorId' | '_notificationGroupId'
> & {
  _parentId?: Types.ObjectId;
};

// export class NotificationTriggerEntity implements INotificationTrigger {
//   type: TriggerTypeEnum;
//
//   identifier: string;
//
//   variables: INotificationTriggerVariable[];
//
//   subscriberVariables?: Pick<INotificationTriggerVariable, 'name'>[];
//
//   reservedVariables?: ITriggerReservedVariable[];
// }

export class NotificationStepEntity {
  _id?: string;

  uuid?: string;

  name?: string;

  _templateId: string;

  active?: boolean;

  replyCallback?: {
    active: boolean;
    url: string;
  };

  // template?: MessageTemplateEntity;

  filters?: StepFilter[];

  _parentId?: string | null;

  metadata?: IWorkflowStepMetadata;

  shouldStopOnFail?: boolean;
}

export class StepFilter {
  isNegated: boolean;

  type: BuilderFieldType;

  value: BuilderGroupValues;

  children: FilterParts[];
}
