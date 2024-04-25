import { Injectable } from '@nestjs/common';
import { MemberRepository } from '@libs/repositories/member';
import { MemberRoleEnum } from '@libs/shared/entities/user/member.enum';
import { IJwtPayload } from '@libs/shared/types';
import { MemberStatusEnum } from '@libs/shared/entities/user/member.interface';

@Injectable()
export class OrganizationService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async getMembers(user: IJwtPayload) {
    return (
      await this.memberRepository.getOrganizationMembers(user.organizationId)
    )
      .map((member) => {
        if (!user.roles.includes(MemberRoleEnum.ADMIN)) {
          if (member.memberStatus === MemberStatusEnum.INVITED) return null;
          if (member.user) member.user.email = '';
          if (member.invite) member.invite.email = '';
        }

        return member;
      })
      .filter((member) => !!member);
  }
}
