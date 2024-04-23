import { EnvironmentId, OrganizationId, UserId } from '@libs/shared/types';
import { WorkflowId } from '@libs/repositories/workflow/types';
import { IWorkflowEntity } from '@libs/shared/entities/workflow';

export class WorkflowEntity implements IWorkflowEntity {
  _id?: WorkflowId;

  _organizationId: OrganizationId;

  _environmentId: EnvironmentId;
  _userId: UserId;

  active: boolean;

  deleted: boolean;

  deletedAt?: string;

  deletedBy?: string;

  createdAt: string;

  updatedAt?: string;
  description: string;
  identifier: string;
  name: string;
  tags: string[];
}

export type WorkflowDBModel = WorkflowEntity;
