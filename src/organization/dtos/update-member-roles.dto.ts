import { IsEnum } from 'class-validator';
import { MemberRoleEnum } from '@wolfxlabs/stateless';

export class UpdateMemberRolesDto {
  @IsEnum(MemberRoleEnum)
  role: MemberRoleEnum.ADMIN;
}
