import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { EmailTemplateDBModel } from './email-template.entity';

const emailTemplateSchema = new Schema<EmailTemplateDBModel>(
  {
    _userId: Schema.Types.String,
    deletedAt: Schema.Types.String,
    deletedBy: Schema.Types.String,
    createdAt: Schema.Types.String,
    updatedAt: Schema.Types.String,

    name: Schema.Types.String,
    identifier: Schema.Types.String,
    preview: Schema.Types.String,
    design: Schema.Types.Mixed,
    free: Schema.Types.Boolean,
  },
  schemaOptions,
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EmailTemplate =
  (mongoose.models.EmailTemplate as mongoose.Model<EmailTemplateDBModel>) ||
  mongoose.model<EmailTemplateDBModel>('EmailTemplate', emailTemplateSchema);
