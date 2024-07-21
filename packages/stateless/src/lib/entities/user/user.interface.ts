import { JobTitleEnum, UserId, UserRateLimitId } from '../../types';
import { UserPlan } from '../../entities';

export interface IServicesHashes {
  intercom?: string;
}
export interface IUser {
  _id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  username?: string | null;
  profilePicture?: string | null;
  createdAt: string;
  showOnBoarding?: boolean;
  showOnBoardingTour?: number;
  servicesHashes?: IServicesHashes;
  jobTitle?: JobTitleEnum;
  externalId?: string;
  bio?: string | null;
  urls?: string[] | null;

  plan: UserPlan;

  workflowGuide?: boolean;
  billingGuide?: boolean;
  apiKeyGuide?: boolean;
}

export interface IUserRateLimit {
  _id?: UserRateLimitId;
  _userId: UserId;
  key: string;
  policyId?: string;
  requestCount: number;
  windowStart: Date;

  createdAt?: Date;
}
