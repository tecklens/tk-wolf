import { JobTitleEnum } from '../../types';

export interface IServicesHashes {
  intercom?: string;
}
export interface IUserEntity {
  _id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  profilePicture?: string | null;
  createdAt: string;
  showOnBoarding?: boolean;
  showOnBoardingTour?: number;
  servicesHashes?: IServicesHashes;
  jobTitle?: JobTitleEnum;
  externalId?: string;
}
