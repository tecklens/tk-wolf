import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { UserRateLimitDBModel } from './user-rate-limit.entity';

const userRateLimitSchema = new Schema<UserRateLimitDBModel>(
  {
    key: Schema.Types.String,
    policyId: Schema.Types.String,
    requestCount: Schema.Types.Number,
    windowStart: Schema.Types.Date,
    _userId: Schema.Types.String,
    createdAt: Schema.Types.Date,
  },
  schemaOptions,
);

userRateLimitSchema.index({ _userId: 1 });

export const UserRateLimitSchema =
  (mongoose.models.UserRateLimit as mongoose.Model<UserRateLimitDBModel>) ||
  mongoose.model<UserRateLimitDBModel>('UserRateLimit', userRateLimitSchema);
