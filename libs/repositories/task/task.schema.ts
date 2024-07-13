import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { TaskDBModel } from './task.entity';

const taskSchema = new Schema<TaskDBModel>(
  {
    _workflowId: Schema.Types.String,
    _userId: Schema.Types.String,
    _environmentId: Schema.Types.String,
    _organizationId: Schema.Types.String,
    workflowName: Schema.Types.String,
    deletedAt: Schema.Types.Date,
    deletedBy: Schema.Types.String,
    createdAt: Schema.Types.Date,
    updatedAt: Schema.Types.Date,

    _nodeId: Schema.Types.String,
    _providerId: Schema.Types.String,
    providerName: Schema.Types.String,
    channel: Schema.Types.String,
    transactionId: { type: Schema.Types.String, index: 1 },

    payload: Schema.Types.Mixed,
    code: Schema.Types.String,
    createdBy: Schema.Types.String,
    email: Schema.Types.String,
    phone: Schema.Types.String,
    name: Schema.Types.String,
    priority: Schema.Types.String,
    status: Schema.Types.Number,
    subscriberId: Schema.Types.String,
    type: Schema.Types.String,
    errorDetail: Schema.Types.Mixed,
    bodyWebhook: Schema.Types.Mixed,
  },
  schemaOptions,
);

taskSchema.index({ _userId: 1, _environmentId: 1, _organizationId: 1 });

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Task =
  (mongoose.models.Task as mongoose.Model<TaskDBModel>) ||
  mongoose.model<TaskDBModel>('Task', taskSchema);
