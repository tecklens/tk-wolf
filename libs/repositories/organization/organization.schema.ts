import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { schemaOptions } from '../schema-default.options';
import { OrganizationDBModel } from './organization.entity';
import { ApiServiceLevelEnum } from '@wolfxlabs/stateless';

const organizationSchema = new Schema<OrganizationDBModel>(
  {
    name: Schema.Types.String,
    logo: Schema.Types.String,
    apiServiceLevel: {
      type: Schema.Types.String,
      enum: ApiServiceLevelEnum,
    },
    branding: {
      fontColor: Schema.Types.String,
      contentBackground: Schema.Types.String,
      fontFamily: Schema.Types.String,
      logo: Schema.Types.String,
      color: Schema.Types.String,
      direction: Schema.Types.String,
    },
    partnerConfigurations: {
      type: [
        {
          accessToken: Schema.Types.String,
          configurationId: Schema.Types.String,
          teamId: Schema.Types.String,
          projectIds: [Schema.Types.String],
        },
      ],
      select: false,
    },
    defaultLocale: Schema.Types.String,
    domain: Schema.Types.String,
    externalId: Schema.Types.String,
  },
  schemaOptions,
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Organization =
  (mongoose.models.Organization as mongoose.Model<OrganizationDBModel>) ||
  mongoose.model<OrganizationDBModel>('Organization', organizationSchema);
