import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { EdgeDBModel } from './edge.entity';

const edgeSchema = new Schema<EdgeDBModel>(
  {
    _workflowId: Schema.Types.String,
    deleted: Schema.Types.Boolean,
    deletedAt: Schema.Types.String,
    deletedBy: Schema.Types.String,
    createdAt: Schema.Types.String,
    updatedAt: Schema.Types.String,
    type: Schema.Types.String,
    source: Schema.Types.String,
    target: Schema.Types.String,
    sourceHandle: Schema.Types.String,
    targetHandle: Schema.Types.String,
    style: Schema.Types.Mixed,
    animated: Schema.Types.Boolean,
    hidden: Schema.Types.Boolean,
    data: Schema.Types.Mixed,
    className: Schema.Types.String,
    zIndex: Schema.Types.Number,
    ariaLabel: Schema.Types.String,
    interactionWidth: Schema.Types.Number,
    updatable: Schema.Types.Mixed,
  },
  schemaOptions,
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EdgeSchema =
  (mongoose.models.Edge as mongoose.Model<EdgeDBModel>) ||
  mongoose.model<EdgeDBModel>('Edge', edgeSchema);
