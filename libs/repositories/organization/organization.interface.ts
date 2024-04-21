import { ApiServiceLevelEnum } from "@libs/shared/types";

export interface IOrganizationEntity {
  _id: string;
  name: string;
  apiServiceLevel?: ApiServiceLevelEnum;
  branding?: {
    color: string;
    logo: string;
    fontColor?: string;
    fontFamily?: string;
    contentBackground?: string;
    direction?: 'ltr' | 'rtl';
  };
  defaultLocale?: string;
  domain?: string;
  createdAt: string;
  updatedAt: string;
  externalId?: string;
}
