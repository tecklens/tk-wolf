import { Types } from 'mongoose';

import { UserEntity } from '../user';
import type { OrganizationId } from '../organization';
import { ChangePropsValueType } from '@tps/helpers';
import { MemberRoleEnum } from '@libs/shared/entities/user/member.enum';
import {
  IMemberInvite,
  MemberStatusEnum,
} from '@libs/shared/entities/user/member.interface';

export class MemberEntity {
  _id: string;

  _userId: string;

  user?: Pick<UserEntity, 'firstName' | '_id' | 'lastName' | 'email'>;

  roles: MemberRoleEnum[];

  invite?: IMemberInvite;

  memberStatus: MemberStatusEnum;

  _organizationId: OrganizationId;

  isDefault: boolean;
}

export type MemberDBModel = ChangePropsValueType<
  Omit<MemberEntity, 'invite'>,
  '_userId' | '_organizationId'
> & {
  invite?: IMemberInvite & {
    _inviterId: Types.ObjectId;
  };
};
