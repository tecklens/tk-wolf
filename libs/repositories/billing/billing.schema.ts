import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { BillingDBModel } from './billing.entity';

const billingSchema = new Schema<BillingDBModel>(
  {
    _userId: Schema.Types.String,
    _environmentId: Schema.Types.String,
    _organizationId: Schema.Types.String,
    transactionId: Schema.Types.String,
    amount: Schema.Types.Number,
    amount_received: Schema.Types.Number,
    application_fee_amount: Schema.Types.Number,
    client_secret: Schema.Types.String,
    created: Schema.Types.Number,
    metadata: Schema.Types.Mixed,
    payment_method: Schema.Types.String,

    status: Schema.Types.Number,

    createdAt: Schema.Types.Date,
    updatedAt: Schema.Types.Date,
  },
  schemaOptions,
);

billingSchema.index({ _userId: 1, _environmentId: 1, _organizationId: 1 });
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Billing =
  (mongoose.models.Billing as mongoose.Model<BillingDBModel>) ||
  mongoose.model<BillingDBModel>('Billing', billingSchema);
