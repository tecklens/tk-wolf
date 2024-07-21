import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { BugReportDBModel } from './bug-report.entity';

const bugReportSchema = new Schema<BugReportDBModel>(
  {
    title: Schema.Types.String,
    description: Schema.Types.String,
    ip: Schema.Types.String,
    _userId: Schema.Types.String,
    createdAt: Schema.Types.Date,
  },
  schemaOptions,
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BugReportSchema =
  (mongoose.models.BugReport as mongoose.Model<BugReportDBModel>) ||
  mongoose.model<BugReportDBModel>('BugReport', bugReportSchema);
