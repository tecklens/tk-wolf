import { SetMetadata } from '@nestjs/common';
import { MemberRoleEnum } from '../entities';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: MemberRoleEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
