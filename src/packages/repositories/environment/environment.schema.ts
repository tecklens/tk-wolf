import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { EnvironmentDBModel } from './environment.entity';

const environmentSchema = new Schema<EnvironmentDBModel>(
  {
    name: Schema.Types.String,
    identifier: {
      type: Schema.Types.String,
      unique: true,
    },
    _organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      index: true,
    },
    apiKeys: [
      {
        key: {
          type: Schema.Types.String,
          unique: true,
        },
        _userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    widget: {
      notificationCenterEncryption: {
        type: Schema.Types.Boolean,
        default: false,
      },
    },
    dns: {
      mxRecordConfigured: {
        type: Schema.Types.Boolean,
      },
      inboundParseDomain: {
        type: Schema.Types.String,
      },
    },
    _parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Environment',
    },
  },
  schemaOptions,
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Environment =
  (mongoose.models.Environment as mongoose.Model<EnvironmentDBModel>) ||
  mongoose.model<EnvironmentDBModel>('Environment', environmentSchema);
