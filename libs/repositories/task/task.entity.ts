import { NodeId } from '@libs/repositories/node/types';
import { WorkflowId } from '@libs/repositories/workflow/types';
import { ITaskEntity } from '@libs/shared/entities/workflow/task.interface';
import { TaskId } from '@libs/repositories/task/types';
import { ProviderId } from '@libs/repositories/provider/types';
import { TaskStatus } from '@tps/task.interface';
import { UserId } from '@libs/repositories/user';
import { EnvironmentId, OrganizationId } from '@libs/shared/types';

export class TaskEntity implements ITaskEntity {
  id?: string;
  _id?: TaskId;
  _workflowId: WorkflowId;
  _userId: UserId;
  _environmentId: EnvironmentId;
  _organizationId: OrganizationId;
  workflowName: string;
  _providerId: ProviderId;
  providerName: string;
  payload: any;
  channel: string;

  deletedAt?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt?: string;
  _nodeId: NodeId;
  code: string;
  createdBy: string;
  email: string;
  phone: string;
  name: string;
  priority: string;
  status: TaskStatus;
  subscriberId: string;
  type: string;

  errorDetail: any;
  bodyWebhook: any;
}

export type TaskDBModel = TaskEntity;
