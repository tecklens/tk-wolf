import { UserId } from '@libs/shared/types';

export type BugReportId = string;

export interface IBugReport {
  id?: BugReportId;
  title: string;
  description: string;
  ip: string;

  _userId: UserId;

  createdAt?: Date;
}
