import { Exclude } from 'class-transformer';

import { UserId } from './types';
import { AuthProviderEnum } from '@config/user.enums';

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

export class UserEntity {
  _id: UserId;

  resetToken?: string;

  resetTokenDate?: string;

  resetTokenCount?: IUserResetTokenCount;

  firstName?: string | null;

  lastName?: string | null;

  email?: string | null;

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
}

export type UserDBModel = UserEntity;
