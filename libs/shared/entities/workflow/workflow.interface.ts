import { EnvironmentId, OrganizationId } from '../../types';
import { WorkflowId } from '@libs/repositories/workflow/types';
import { UserId } from '@libs/repositories/user';
import { NodeId } from '@libs/repositories/node/types';
import { IDataTrigger } from '@app/trigger/dtos/create-trigger.dto';

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

export interface INextJob extends IDataTrigger {
  workflowId: WorkflowId;
  workflowName: string;
  currentNodeId: NodeId;
  organizationId: string;
  userId: string;
}

export interface IWebhookData {
  _workflowId: string;
  _userId: string;
  requestData: any;
}
