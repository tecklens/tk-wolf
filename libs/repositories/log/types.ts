import { UserId } from '@libs/repositories/user';
import { EnvironmentId } from '@libs/repositories/environment';
import { OrganizationId } from '@libs/repositories/organization';
import { WorkflowId } from '@libs/repositories/workflow/types';

export type LogId = string;

export interface ILogTrigger {
  _id?: LogId;
  event_type: string;
  _userId: UserId;
  _environmentId: EnvironmentId;
  _organizationId: OrganizationId;
  status: number;

  _workflowId: WorkflowId;
  workflowName: string;
  recipient: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt: Date;
}
