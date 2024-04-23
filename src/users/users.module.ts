import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from '@libs/repositories/user';
import { EnvironmentRepository } from '@libs/repositories/environment';
import { JwtStrategy } from '@app/auth/strategy/jwt.strategy';
import { AuthService } from '@app/auth/auth.service';
import { OrganizationRepository } from '@libs/repositories/organization';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentModule } from '@app/environment/environment.module';
import { MemberRepository } from '@libs/repositories/member';

@Module({
  imports: [EnvironmentModule],
  providers: [
    UsersService,
    UserRepository,
    EnvironmentRepository,
    JwtStrategy,
    AuthService,
    OrganizationRepository,
    MemberRepository,
    JwtService,
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
