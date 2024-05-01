import { JobTitleEnum } from '../../types';
import { UserPlan } from '@libs/repositories/user';

export interface IServicesHashes {
  intercom?: string;
}
export interface IUserEntity {
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
}
