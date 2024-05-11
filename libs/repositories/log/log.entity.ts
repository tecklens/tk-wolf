import { ILogWolf } from '@libs/repositories/log/types';

export class LogEntity implements ILogWolf {
  _id: string;
  event_type: string;
  _userId: string;
  _environmentId: string;
  _organizationId: string;
  status: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt: Date;
}

export type LogDBModel = LogEntity;
