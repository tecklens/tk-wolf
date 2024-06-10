import { BaseRepository } from '../base-repository';
import { BugReportDBModel, BugReportEntity } from './bug-report.entity';
import { BugReportSchema } from '@libs/repositories/bug-report/bug-report.schema';

export class BugReportRepository extends BaseRepository<
  BugReportDBModel,
  BugReportEntity,
  object
> {
  constructor() {
    super(BugReportSchema, BugReportEntity);
  }
}
