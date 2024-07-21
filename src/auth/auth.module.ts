import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@app/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { secret } from '@config/env';
import { HttpModule } from '@nestjs/axios';
import { EnvironmentModule } from '@app/environment/environment.module';
import { LimitService } from './limit.service';
import {
  ApiKeyStrategy,
  GitHubStrategy,
  GoogleStrategy,
  JwtStrategy,
  LocalStrategy,
} from './strategy';
import { EnvironmentRepository } from '@libs/repositories/environment';
import { OrganizationRepository } from '@libs/repositories/organization';
import { MemberRepository } from '@libs/repositories/member';
import { UserRepository } from '@libs/repositories/user';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: secret,
      signOptions: { expiresIn: 60 * 30 },
    }),
    HttpModule.register({
      timeout: 3000,
      maxRedirects: 3,
    }),
    EnvironmentModule,
  ],
  providers: [
    LimitService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GitHubStrategy,
    ApiKeyStrategy,
    GoogleStrategy,
    EnvironmentRepository,
    OrganizationRepository,
    MemberRepository,
    UserRepository,
  ],
  exports: [
    AuthService,
    JwtStrategy,
    GitHubStrategy,
    ApiKeyStrategy,
    GoogleStrategy,
    LimitService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
