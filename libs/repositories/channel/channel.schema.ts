import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { ChannelDBModel } from './channel.entity';

const channelSchema = new Schema<ChannelDBModel>(
  {
    channelName: Schema.Types.String,
    channelDescription: Schema.Types.String,
    _organizationId: Schema.Types.String,
    _userId: Schema.Types.String,
    createdAt: Schema.Types.Date,
  },
  schemaOptions,
);

channelSchema.index({ _userId: 1, _organizationId: 1 });

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ChannelSchema =
  (mongoose.models.Channel as mongoose.Model<ChannelDBModel>) ||
  mongoose.model<ChannelDBModel>('Channel', channelSchema);
