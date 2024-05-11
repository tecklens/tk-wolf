import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { LogDBModel } from './log.entity';

const logSchema = new Schema<LogDBModel>(
  {
    event_type: Schema.Types.String,
    _userId: { type: Schema.Types.String, index: true },
    _environmentId: { type: Schema.Types.String, index: true },
    _organizationId: { type: Schema.Types.String, index: true },
    status: Schema.Types.Number,

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

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LogWolf =
  (mongoose.models.Log as mongoose.Model<LogDBModel>) ||
  mongoose.model<LogDBModel>('Log', logSchema);
