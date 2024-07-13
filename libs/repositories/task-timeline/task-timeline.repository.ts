import { BaseRepository } from '../base-repository';
import {
  TaskTimelineDBModel,
  TaskTimelineEntity,
} from './task-timeline.entity';
import { TaskTimeline } from '@libs/repositories/task-timeline/task-timeline.schema';

export class TaskTimelineRepository extends BaseRepository<
  TaskTimelineDBModel,
  TaskTimelineEntity,
  object
> {
  constructor() {
    super(TaskTimeline, TaskTimelineEntity);
  }
}
