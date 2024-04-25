import { SetMetadata } from '@nestjs/common';
import { MemberRoleEnum } from '@libs/shared/entities/user/member.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: MemberRoleEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
