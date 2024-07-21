import { EnvironmentId, OrganizationId, UserId, WorkflowId } from '../../types';
import { NodeId } from './node.interface';
export interface IWorkflow {
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
  viewport: any;
}

export interface INextJob {
  workflowId: WorkflowId;
  workflowName: string;
  currentNodeId: NodeId;
  organizationId: string;
  environmentId: string;
  userId: string;

  target: ITargetTrigger;
  overrides?: IOverridesDataTrigger;
  transactionId: string;
}

export interface IWebhookData {
  _workflowId: string;
  _userId: string;
  requestData: any;
  taskId: string;
}

export interface ITargetTrigger {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  locale: string;
}

export interface IOverridesDataTrigger {
  content?: string;
  to?: string;
  from?: string;
  customData?: any;

  webhookUrl?: string;
  baseUrl?: string;
}
