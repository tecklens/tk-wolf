import { EnvironmentId, OrganizationId, UserId } from '@libs/shared/types';
import {
  IOverridesDataTrigger,
  ITargetTrigger,
} from '@app/trigger/dtos/create-trigger.dto';

export enum MarkMessagesAsEnum {
  READ = 'read',
  SEEN = 'seen',
  UNREAD = 'unread',
  UNSEEN = 'unseen',
}

export interface INextJobProps {
  workflowId: string;
  workflowName: string;
  orgId: OrganizationId;
  envId: EnvironmentId;
  target: ITargetTrigger;
  overrides: IOverridesDataTrigger;
  userId: UserId;
  type: string;
  previousNodeId: string | undefined;
  transactionId: string;
}
