import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SwitchOrganizationCommand } from '@pak/usecases';
import { AuthService } from '@pak/services/auth';
import { ApiException } from '@pak/utils/exceptions';
import { OrganizationRepository } from '@pak/repositories/organization';
import { UserRepository } from '@pak/repositories/user';
import { MemberRepository } from '@pak/repositories/member';
import { EnvironmentRepository } from '@pak/repositories/environment';

@Injectable()
export class SwitchOrganization {
  constructor(
    private organizationRepository: OrganizationRepository,
    private userRepository: UserRepository,
    private memberRepository: MemberRepository,
    private environmentRepository: EnvironmentRepository,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  async execute(command: SwitchOrganizationCommand): Promise<string> {
    const isAuthenticated =
      await this.authService.isAuthenticatedForOrganization(
        command.userId,
        command.newOrganizationId,
      );
    if (!isAuthenticated) {
      throw new UnauthorizedException(
        `Not authorized for organization ${command.newOrganizationId}`,
      );
    }

    const member = await this.memberRepository.findMemberByUserId(
      command.newOrganizationId,
      command.userId,
    );
    if (!member) throw new ApiException('Member not found');

    const user = await this.userRepository.findById(command.userId);
    if (!user) throw new ApiException(`User ${command.userId} not found`);

    const environment = await this.environmentRepository.findOne({
      _organizationId: command.newOrganizationId,
      _parentId: { $exists: false },
    });

    const token = await this.authService.getSignedToken(
      user,
      command.newOrganizationId,
      member,
      environment?._id,
    );

    return token;
  }
}
