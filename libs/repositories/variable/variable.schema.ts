import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { VariableDBModel } from './variable.entity';

const variableSchema = new Schema<VariableDBModel>(
  {
    _workflowId: { type: Schema.Types.String, index: true },
    type: Schema.Types.String,
    name: Schema.Types.String,
    required: Schema.Types.Boolean,
    defaultValue: Schema.Types.Mixed,
    isDefault: Schema.Types.Boolean,
    createdAt: Schema.Types.String,
    updatedAt: Schema.Types.String,
  },
  schemaOptions,
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Variable =
  (mongoose.models.Variable as mongoose.Model<VariableDBModel>) ||
  mongoose.model<VariableDBModel>('Variable', variableSchema);
