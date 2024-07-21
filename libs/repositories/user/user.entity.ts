import { Exclude } from 'class-transformer';
import { AuthProviderEnum, IUser, JobTitleEnum, UserId } from '@wolfxlabs/stateless';

export enum UserPlan {
  free,
  silver,
  gold,
  diamond,
}

export const consumePoints = {
  [UserPlan.free]: 10000000,
  [UserPlan.silver]: 100000,
  [UserPlan.gold]: 10000,
  [UserPlan.diamond]: 1000,
};

export interface IUserToken {
  providerId: string;
  provider: AuthProviderEnum;
  accessToken: string;
  refreshToken: string;
  valid: boolean;
  username?: string;
}

export interface IUserResetTokenCount {
  reqInMinute: number;
  reqInDay: number;
}

export class UserEntity implements IUser {
  _id: UserId;

  resetToken?: string;

  resetTokenDate?: string;

  resetTokenCount?: IUserResetTokenCount;

  firstName?: string | null;

  lastName?: string | null;

  email?: string | null;
  username?: string | null;

  profilePicture?: string | null;

  @Exclude({ toPlainOnly: true })
  tokens: IUserToken[];

  @Exclude({ toPlainOnly: true })
  password?: string;

  createdAt: string;

  showOnBoarding?: boolean;
  showOnBoardingTour?: number;

  failedLogin?: {
    times: number;
    lastFailedAttempt: string;
  };

  servicesHashes?: { intercom?: string };

  jobTitle?: JobTitleEnum;

  externalId?: string;
  bio?: string;
  urls?: string[] | null;

  plan: UserPlan;

  workflowGuide?: boolean;
  billingGuide?: boolean;
  apiKeyGuide?: boolean;

  changePasswordTransactionId?: string;
}

export type UserDBModel = UserEntity;
