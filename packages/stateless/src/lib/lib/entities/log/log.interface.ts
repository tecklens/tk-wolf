import {
  EnvironmentId,
  LogId,
  OrganizationId,
  UserId,
  WorkflowId,
} from '../../types';

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
