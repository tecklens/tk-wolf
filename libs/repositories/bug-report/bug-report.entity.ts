import { BugReportId, IBugReport, UserId } from '@wolf/stateless';

export class BugReportEntity implements IBugReport {
  id?: BugReportId;
  title: string;
  description: string;
  ip: string;
  _userId: UserId;

  createdAt: Date;
}

export type BugReportDBModel = BugReportEntity;
