import { WorkflowId } from '@libs/repositories/workflow/types';
import { TaskId } from '@libs/repositories/task/types';
import { NodeId } from '@libs/repositories/node/types';
import { ProviderId } from '@libs/repositories/provider/types';
import { TaskStatus } from '@tps/task.interface';
import { UserId } from '@libs/repositories/user';
import { EnvironmentId, OrganizationId } from '@libs/shared/types';

export interface ITaskEntity {
  id?: TaskId;

  _workflowId: WorkflowId;
  _userId: UserId;
  _environmentId: EnvironmentId;
  _organizationId: OrganizationId;
  workflowName: string;
  _nodeId: NodeId;
  _providerId: ProviderId;
  providerName: string;
  payload: any;
  channel: string;

  code: string;
  name: string;
  type: string;
  status: TaskStatus;
  priority: string;
  subscriberId: string;
  email: string;
  phone: string;
  errorDetail: any;
  bodyWebhook: any;

  deletedAt?: string;
  deletedBy?: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}
