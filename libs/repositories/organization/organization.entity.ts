import { ApiServiceLevelEnum, IOrganization } from '@wolfxlabs/stateless';

export class OrganizationEntity implements IOrganization {
  _id: string;

  name: string;

  logo?: string;

  // TODO: NV-3067 - Remove optional once all organizations have a service level
  apiServiceLevel?: ApiServiceLevelEnum;

  branding?: {
    fontFamily?: string;
    fontColor?: string;
    contentBackground?: string;
    logo: string;
    color: string;
    direction?: 'ltr' | 'rtl';
  };

  partnerConfigurations?: IPartnerConfiguration[];

  defaultLocale?: string;

  domain?: string;

  createdAt: string;

  updatedAt: string;

  externalId?: string;
}

export type OrganizationDBModel = OrganizationEntity;

export interface IPartnerConfiguration {
  accessToken: string;
  configurationId: string;
  projectIds?: string[];
  teamId?: string;
}
