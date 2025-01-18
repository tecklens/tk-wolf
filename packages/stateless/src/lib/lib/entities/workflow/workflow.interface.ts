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
  overrides?: Record<string, any>;
  transactionId: string;
}

export interface IWebhookData {
  _workflowId: string;
  _userId: string;
  requestData: any;
  taskId: string;
}

export interface ITargetTrigger extends IPushTargetTrigger {
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

export interface IPushTargetTrigger {
  target: string[];
  title: string;
  content: string;
  payload: object;
  subscriber: object;
  step: {
    digest: boolean;
    events: object[] | undefined;
    total_count: number | undefined;
  };
}

export interface IPushOverridesTrigger {
  type?: 'notification' | 'data';
  data?: { [key: string]: string };
  tag?: string;
  body?: string;
  icon?: string;
  badge?: number;
  color?: string;
  sound?: string;
  title?: string;
  bodyLocKey?: string;
  bodyLocArgs?: string;
  clickAction?: string;
  titleLocKey?: string;
  titleLocArgs?: string;
  ttl?: number;
  expiration?: number;
  priority?: 'default' | 'normal' | 'high';
  subtitle?: string;
  channelId?: string;
  categoryId?: string;
  mutableContent?: boolean;
  android?: { [key: string]: { [key: string]: string } | string };
  apns?: {
    headers?: { [key: string]: string };
    payload: {
      aps: { [key: string]: { [key: string]: string } | string };
    };
  };
  fcmOptions?: { analyticsLabel?: string };
}
