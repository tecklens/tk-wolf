import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@app/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@app/auth/strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { secret } from '@config/env';
import { JwtStrategy } from '@app/auth/strategy/jwt.strategy';
import { EnvironmentRepository } from '@libs/repositories/environment';
import { OrganizationRepository } from '@libs/repositories/organization';
import { UserRepository } from '@libs/repositories/user';
import { GitHubStrategy } from '@app/auth/strategy/github.strategy';
import { HttpModule } from '@nestjs/axios';
import { ApiKeyStrategy } from '@app/auth/strategy/apikey.strategy';
import { EnvironmentModule } from '@app/environment/environment.module';

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
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GitHubStrategy,
    ApiKeyStrategy,
    EnvironmentRepository,
    OrganizationRepository,
    UserRepository,
  ],
  exports: [AuthService, JwtStrategy, GitHubStrategy, ApiKeyStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
