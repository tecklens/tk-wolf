import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { TaskDBModel } from './task.entity';

const taskSchema = new Schema<TaskDBModel>(
  {
    _workflowId: Schema.Types.String,
    deletedAt: Schema.Types.String,
    deletedBy: Schema.Types.String,
    createdAt: Schema.Types.String,
    updatedAt: Schema.Types.String,

    _nodeId: Schema.Types.String,
    code: Schema.Types.String,
    createdBy: Schema.Types.String,
    email: Schema.Types.String,
    name: Schema.Types.String,
    priority: Schema.Types.String,
    status: Schema.Types.Number,
    subscriberId: Schema.Types.String,
    type: Schema.Types.String,
  },
  schemaOptions,
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Task =
  (mongoose.models.Task as mongoose.Model<TaskDBModel>) ||
  mongoose.model<TaskDBModel>('Task', taskSchema);
