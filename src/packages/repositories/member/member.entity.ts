import { Types } from 'mongoose';

import { UserEntity } from '../user';
import type { OrganizationId } from '../organization';
import { MemberRoleEnum } from '@config/member.enum';
import { IMemberInvite, MemberStatusEnum } from '@tps/member.interface';
import { ChangePropsValueType } from '@pak/repositories/environment';

export class MemberEntity {
  _id: string;

  _userId: string;

  user?: Pick<UserEntity, 'firstName' | '_id' | 'lastName' | 'email'>;

  roles: MemberRoleEnum[];

  invite?: IMemberInvite;

  memberStatus: MemberStatusEnum;

  _organizationId: OrganizationId;
}

export type MemberDBModel = ChangePropsValueType<
  Omit<MemberEntity, 'invite'>,
  '_userId' | '_organizationId'
> & {
  invite?: IMemberInvite & {
    _inviterId: Types.ObjectId;
  };
};
