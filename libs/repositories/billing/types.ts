import { OrganizationId } from '@libs/shared/types';

export interface IBilling {
  _id?: string;
  _userId?: string;
  _environmentId?: string;
  _organizationId?: OrganizationId;
  transactionId?: string;
  amount: number;
  amount_received: number;
  application_fee_amount: number;
  client_secret?: string;
  created?: number;
  metadata?: any;
  payment_method?: string;

  status: number;

  createdAt?: string;
  updatedAt?: string;
}
