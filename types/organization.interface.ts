import { IMemberInvite, MemberStatusEnum } from './member.interface';
import { MemberRoleEnum } from '@config/member.enum';
import { IUserEntity } from '@tps/user.interface';

export interface IOrganizationEntity {
  _id: string;
  name: string;
  members: {
    _id: string;
    _userId?: string;
    user?: Pick<IUserEntity, 'firstName' | '_id' | 'lastName' | 'email'>;
    roles: MemberRoleEnum[];
    invite?: IMemberInvite;
    memberStatus: MemberStatusEnum;
  }[];
  branding?: {
    color: string;
    logo: string;
    fontColor: string;
    fontFamily: string;
    contentBackground: string;
    direction: 'ltr' | 'rtl';
  };
}

export type OrganizationId = string;
export type EnvironmentId = string;
