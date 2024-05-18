import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { MemberRepository } from '@libs/repositories/member';
import { UserRepository } from '@libs/repositories/user';
import { OrganizationRepository } from '@libs/repositories/organization';
import { AuthService } from '@app/auth/auth.service';
import { UsersService } from '@app/users/users.service';
import { UsersModule } from '@app/users/users.module';
import { LimitService } from '@app/auth/limit.service';
import { AuthModule } from '@app/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [
    OrganizationService,
    MemberRepository,
    UserRepository,
    OrganizationRepository,
  ],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
