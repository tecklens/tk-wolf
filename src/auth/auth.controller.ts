import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Header,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { ApiBearerAuth, ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { ApiException } from '@app/packages/utils/exceptions';
import { GitHubAuthGuard } from '@app/auth/strategy/github-auth.guard';
import { IJwtPayload } from '@libs/shared/types';
import { buildOauthRedirectUrl } from '@libs/shared/services/oauth-redirect';
import { UserRegistrationBodyDto } from '@app/auth/dtos/user-registration.dto';
import { PasswordResetBodyDto } from '@app/auth/dtos/password-reset.dto';
import { LoginBodyDto } from '@app/auth/dtos/login.dto';
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';

@ApiBearerAuth()
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Auth')
@ApiExcludeController()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/github')
  githubAuth() {
    Logger.verbose('Checking Github Auth');

    if (
      !process.env.GITHUB_OAUTH_CLIENT_ID ||
      !process.env.GITHUB_OAUTH_CLIENT_SECRET
    ) {
      throw new ApiException(
        'GitHub auth is not configured, please provide GITHUB_OAUTH_CLIENT_ID and GITHUB_OAUTH_CLIENT_SECRET as env variables',
      );
    }

    Logger.verbose('Github Auth has all variables.');

    return {
      success: true,
    };
  }

  @Get('/github/callback')
  @UseGuards(GitHubAuthGuard)
  async githubCallback(@Req() request: any, @Res() response: any) {
    const url = buildOauthRedirectUrl(request);

    return response.redirect(url);
  }

  @Get('/refresh')
  @UseGuards(JwtAuthGuard)
  @Header('Cache-Control', 'no-store')
  refreshToken(@Body() user: IJwtPayload) {
    if (!user || !user._id) throw new BadRequestException();

    return this.authService.refreshToken(user._id);
  }

  @Post('/register')
  @Header('Cache-Control', 'no-store')
  async userRegistration(@Body() body: UserRegistrationBodyDto) {
    return await this.authService.userRegistration(body);
  }

  @Post('/reset/request')
  async forgotPasswordRequest(@Body() body: { email: string }) {
    return await this.authService.resetPassword(body);
  }

  @Post('/reset')
  async passwordReset(@Body() body: PasswordResetBodyDto) {
    return await this.authService.passwordReset(body);
  }

  @Post('/login')
  @Header('Cache-Control', 'no-store')
  async userLogin(@Body() body: LoginBodyDto) {
    return await this.authService.login({
      email: body.email,
      password: body.password,
    });
  }

  // @Post('/organizations/:organizationId/switch')
  // @UseGuards(UserAuthGuard)
  // @HttpCode(200)
  // @Header('Cache-Control', 'no-store')
  // async organizationSwitch(
  //   @Body() user: IJwtPayload,
  //   @Param('organizationId') organizationId: string,
  // ): Promise<string> {
  //   const command = SwitchOrganizationCommand.create({
  //     userId: user._id,
  //     newOrganizationId: organizationId,
  //   });
  //
  //   return await this.switchOrganizationUsecase.execute(command);
  // }
  //
  // @Post('/environments/:environmentId/switch')
  // @Header('Cache-Control', 'no-store')
  // @UseGuards(UserAuthGuard)
  // @HttpCode(200)
  // async projectSwitch(
  //   @Body() user: IJwtPayload,
  //   @Param('environmentId') environmentId: string,
  // ): Promise<{ token: string }> {
  //   const command = SwitchEnvironmentCommand.create({
  //     userId: user._id,
  //     newEnvironmentId: environmentId,
  //     organizationId: user.organizationId,
  //   });
  //
  //   return {
  //     token: await this.switchEnvironmentUsecase.execute(command),
  //   };
  // }
}
