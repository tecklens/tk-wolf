import { ILogTrigger, WorkflowId } from '@wolf/stateless';

export class LogEntity implements ILogTrigger {
  _id: string;
  event_type: string;
  _userId: string;
  _environmentId: string;
  _organizationId: string;

  _workflowId: WorkflowId;
  workflowName: string;
  recipient: string;

  status: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt: Date;
}

export type LogDBModel = LogEntity;
