import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { SubscriberDBModel } from './subscriber.entity';

const subscriberSchema = new Schema<SubscriberDBModel>(
  {
    channelId: Schema.Types.String,
    _userId: Schema.Types.String,
    email: Schema.Types.String,
    phone: Schema.Types.String,
    firstName: Schema.Types.String,
    lastName: Schema.Types.String,
    locale: Schema.Types.String,
    overrides: Schema.Types.Mixed,
    isOnline: Schema.Types.Boolean,
    createdAt: Schema.Types.Date,
  },
  schemaOptions,
);

subscriberSchema.index({ _userId: 1, channelId: 1 });

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SubscriberSchema =
  (mongoose.models.Subscriber as mongoose.Model<SubscriberDBModel>) ||
  mongoose.model<SubscriberDBModel>('Subscriber', subscriberSchema);
