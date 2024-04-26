import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { WorkflowDBModel } from './workflow.entity';

const workflowSchema = new Schema<WorkflowDBModel>(
  {
    _organizationId: { type: Schema.Types.String, index: true },
    _environmentId: { type: Schema.Types.String, index: true },
    _userId: { type: Schema.Types.String, index: true },
    active: Schema.Types.Boolean,
    deleted: Schema.Types.Boolean,
    deletedAt: Schema.Types.String,
    deletedBy: Schema.Types.String,
    createdAt: Schema.Types.String,
    updatedAt: Schema.Types.String,
    description: Schema.Types.String,
    identifier: { type: Schema.Types.String, index: { unique: true } },
    name: Schema.Types.String,
    tags: Schema.Types.Array,
  },
  schemaOptions,
);

workflowSchema.index({ _userId: 1, name: 1 }, { unique: true });

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Workflow =
  (mongoose.models.Workflow as mongoose.Model<WorkflowDBModel>) ||
  mongoose.model<WorkflowDBModel>('Workflow', workflowSchema);
