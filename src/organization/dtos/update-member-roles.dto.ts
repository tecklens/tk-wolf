import { IsEnum } from 'class-validator';
import { MemberRoleEnum } from '@wolf/stateless';

export class UpdateMemberRolesDto {
  @IsEnum(MemberRoleEnum)
  role: MemberRoleEnum.ADMIN;
}
