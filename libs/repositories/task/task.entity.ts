import {
  EnvironmentId,
  ITask,
  NodeId,
  OrganizationId,
  ProviderId,
  TaskId,
  TaskStatus,
  UserId,
  WorkflowId,
} from '@wolf/stateless';

export class TaskEntity implements ITask {
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
  transactionId: string;

  deletedAt?: Date;
  deletedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
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
