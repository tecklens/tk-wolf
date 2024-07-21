import {
  EventTypes,
  ITaskTimeline,
  TaskId,
  UserId,
  WorkflowId,
} from '@wolf/stateless';

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
