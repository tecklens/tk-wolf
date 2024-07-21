import { BrandId, OrganizationId } from '../../types';
export interface IBrand {
    _id?: BrandId;
    _organizationId?: OrganizationId;
    color: string;
    font?: string;
    logo?: string;
    createdAt?: string;
    updatedAt?: string;
}
