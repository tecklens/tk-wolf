import { NodeId } from '@libs/repositories/node/types';
import { WorkflowId } from '@libs/repositories/workflow/types';
import {
  ITaskEntity,
  TaskStatus,
} from '@libs/shared/entities/workflow/task.interface';
import { TaskId } from '@libs/repositories/task/types';

export class TaskEntity implements ITaskEntity {
  _id?: TaskId;
  _workflowId: WorkflowId;

  deletedAt?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt?: string;
  _nodeId: NodeId;
  code: string;
  createdBy: string;
  email: string;
  name: string;
  priority: string;
  status: TaskStatus;
  subscriberId: string;
  type: string;
}

export type TaskDBModel = TaskEntity;
