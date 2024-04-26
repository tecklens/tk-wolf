import { IsEnum } from 'class-validator';
import { MemberRoleEnum } from '@libs/shared/entities/user/member.enum';

export class UpdateMemberRolesDto {
  @IsEnum(MemberRoleEnum)
  role: MemberRoleEnum.ADMIN;
}
