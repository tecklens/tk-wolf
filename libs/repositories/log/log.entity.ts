import { ILogWolf } from '@libs/repositories/log/types';

export class LogEntity implements ILogWolf {
  _id: string;
  event_type: string;
  _userId: string;
  _environmentId: string;
  _organizationId: string;
  status: number;
  createdAt: string;
  updatedAt?: string;
}

export type LogDBModel = LogEntity;
