import { BugReportId, IBugReport } from '@libs/repositories/bug-report/types';
import { UserId } from '@libs/shared/types';

export class BugReportEntity implements IBugReport {
  id?: BugReportId;
  title: string;
  description: string;
  ip: string;
  _userId: UserId;

  createdAt: Date;
}

export type BugReportDBModel = BugReportEntity;
