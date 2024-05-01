import { UserId } from '@libs/repositories/user';
import { EnvironmentId } from '@libs/repositories/environment';
import { OrganizationId } from '@libs/repositories/organization';

export type LogId = string;

export interface ILogWolf {
  _id: LogId;
  event_type: string;
  _userId: UserId;
  _environmentId: EnvironmentId;
  _organizationId: OrganizationId;
  status: number;

  createdAt: string;
  updatedAt?: string;
}