import { WorkflowId } from '@libs/repositories/workflow/types';
import { ITaskTimeline } from '@libs/shared/entities/workflow/task.interface';
import { TaskId } from '@libs/repositories/task/types';
import { UserId } from '@libs/repositories/user';
import { EventTypes } from '@libs/shared/types/events/event-types';

export class TaskTimelineEntity implements ITaskTimeline {
  _id?: TaskId;
  _taskId: TaskId;
  _userId: UserId;
  _workflowId: WorkflowId;
  event: EventTypes;

  deletedAt: Date;
  deletedBy: string;
  updatedAt: Date;
  createdAt: Date;
  createdBy: string;
}

export type TaskTimelineDBModel = TaskTimelineEntity;
