import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { MemberRepository } from '@libs/repositories/member';
import { UserRepository } from '@libs/repositories/user';
import { OrganizationRepository } from '@libs/repositories/organization';
import { AuthModule } from '@app/auth/auth.module';
import { BrandRepository } from '@libs/repositories/brand/brand.repository';

@Module({
  imports: [AuthModule],
  providers: [
    OrganizationService,
    MemberRepository,
    UserRepository,
    OrganizationRepository,
    BrandRepository,
  ],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
