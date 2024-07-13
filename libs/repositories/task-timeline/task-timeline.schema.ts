import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { TaskTimelineDBModel } from './task-timeline.entity';

const taskTimelineSchema = new Schema<TaskTimelineDBModel>(
  {
    _workflowId: Schema.Types.String,
    _userId: Schema.Types.String,
    _taskId: Schema.Types.String,
    event: Schema.Types.String,

    createdAt: Schema.Types.Date,
    updatedAt: Schema.Types.Date,
    deletedAt: {
      type: Schema.Types.Date,
      default: Date.now,
      index: {
        expireAfterSeconds: 0,
      },
    },
  },
  schemaOptions,
);

taskTimelineSchema.index({ _userId: 1, _taskId: 1 });

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TaskTimeline =
  (mongoose.models.TaskTimeline as mongoose.Model<TaskTimelineDBModel>) ||
  mongoose.model<TaskTimelineDBModel>('TaskTimeline', taskTimelineSchema);
