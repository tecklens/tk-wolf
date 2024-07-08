import { IBrand } from '@libs/repositories/brand/types';
import { BrandId, OrganizationId, UserId } from '@libs/shared/types';

export class BrandEntity implements IBrand {
  _id: BrandId;
  _userId: UserId;
  _organizationId: OrganizationId;
  color: string;
  font?: string;
  logo?: string;

  createdAt: string;
  updatedAt?: string;
}

export type BrandDBModel = BrandEntity;
