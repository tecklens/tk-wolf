import { IUser, MemberRoleEnum } from '../../entities';
import { OrganizationId } from '../../types';

export enum MemberStatusEnum {
  NEW = 'new',
  ACTIVE = 'active',
  INVITED = 'invited',
}

export interface IMemberInvite {
  email: string;
  token: string;
  invitationDate: Date;
  answerDate?: Date;
  _inviterId: string;
}

export interface IMember {
  _id: string;

  _userId: string;

  user?: Pick<IUser, 'firstName' | '_id' | 'lastName' | 'email'>;

  roles: MemberRoleEnum[];

  invite?: IMemberInvite;

  memberStatus: MemberStatusEnum;

  _organizationId: OrganizationId;

  isDefault: boolean;
}
