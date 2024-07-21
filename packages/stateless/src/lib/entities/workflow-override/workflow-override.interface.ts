import { EnvironmentId, OrganizationId, WorkflowOverrideId } from '../../types';
import { IWorkflowTemplate } from '@stateless/lib/entities';

export interface IWorkflowOverride {
  _id?: WorkflowOverrideId;

  _organizationId: OrganizationId;

  _environmentId: EnvironmentId;

  _workflowId: string;

  readonly workflow?: IWorkflowTemplate;

  active: boolean;

  deleted: boolean;

  deletedAt?: string;

  deletedBy?: string;

  createdAt: string;

  updatedAt?: string;
}
