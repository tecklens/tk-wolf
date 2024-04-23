import { EnvironmentId, OrganizationId, WorkflowOverrideId } from '../../types';
import { IPreferenceChannels } from '@libs/shared/entities/subscriber-preference';
import { WorkflowId } from '@libs/repositories/workflow/types';
import { UserId } from '@libs/repositories/user';

export interface IWorkflowEntity {
  _id?: WorkflowId;

  _organizationId: OrganizationId;

  _environmentId: EnvironmentId;
  _userId: UserId;

  active: boolean;
  name: string;
  identifier: string;
  description: string;
  tags: string[];

  deleted: boolean;

  deletedAt?: string;

  deletedBy?: string;

  createdAt: string;

  updatedAt?: string;
}
