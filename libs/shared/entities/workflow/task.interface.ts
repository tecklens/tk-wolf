import { WorkflowId } from '@libs/repositories/workflow/types';
import { TaskId } from '@libs/repositories/task/types';
import { NodeId } from '@libs/repositories/node/types';

export interface ITaskEntity {
  id?: TaskId;

  _workflowId: WorkflowId;
  _nodeId: NodeId;

  code: string;
  name: string;
  type: string;
  status: TaskStatus;
  priority: string;
  subscriberId: string;
  email: string;

  deletedAt?: string;
  deletedBy?: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export enum TaskStatus {
  Waiting,
  Processing,
  Done,
  Error,
}
