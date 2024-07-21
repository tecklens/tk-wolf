import {
  EnvironmentId,
  IWorkflow,
  OrganizationId,
  UserId,
  WorkflowId,
} from '@wolf/stateless';

export class WorkflowEntity implements IWorkflow {
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
  viewport: any;
}

export type WorkflowDBModel = WorkflowEntity;
