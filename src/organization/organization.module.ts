import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { MemberRepository } from '@libs/repositories/member';

@Module({
  providers: [OrganizationService, MemberRepository],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
