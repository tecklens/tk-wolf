import { UserId } from '@libs/shared/types';

export type UserRateLimitId = string;

export interface IUserRateLimit {
  _id?: UserRateLimitId;
  _userId: UserId;
  key: string;
  policyId?: string;
  requestCount: number;
  windowStart: Date;

  createdAt?: Date;
}
