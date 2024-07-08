import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { BrandDBModel } from './brand.entity';

const brandSchema = new Schema<BrandDBModel>(
  {
    _userId: Schema.Types.String,
    _organizationId: Schema.Types.String,
    color: Schema.Types.String,
    logo: Schema.Types.String,
    font: Schema.Types.String,
    createdAt: Schema.Types.Date,
    updatedAt: Schema.Types.Date,
  },
  schemaOptions,
);

brandSchema.index({ _userId: 1, _organizationId: 1 });
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Brand =
  (mongoose.models.Brand as mongoose.Model<BrandDBModel>) ||
  mongoose.model<BrandDBModel>('Brand', brandSchema);
