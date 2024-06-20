import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Header,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeController,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';
import { UsersService } from '@app/users/users.service';
import { IJwtPayload } from '@libs/shared/types';
import { ExternalApiAccessible } from '@tps/decorators/external-api.decorator';
import { UserResponseDto } from '@app/users/dtos/user-response.dto';
import { ChangeProfileEmailDto } from '@app/users/dtos/change-profile-email.dto';
import { UserSession } from '@libs/utils/user.session';
import { UserOnboardingRequestDto } from '@app/users/dtos/user-onboarding-request.dto';
import { UserOnboardingTourRequestDto } from '@app/users/dtos/user-onboarding-tour-request.dto';
import { ChangeProfileDto } from '@app/users/dtos/change-profile.dto';
import { SubmitBugRequestDto } from '@app/users/dtos/submit-bug-request.dto';

@ApiBearerAuth()
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('User')
@ApiExcludeController()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  @ApiOperation({
    summary: 'Get User',
  })
  @ExternalApiAccessible()
  async getMyProfile(
    @UserSession() user: IJwtPayload,
  ): Promise<UserResponseDto> {
    Logger.verbose('Getting User');
    Logger.debug('User id: ' + user._id);
    Logger.verbose('Creating GetMyProfileCommand');

    return this.usersService.getMyProfile(user._id);
  }

  @Put('/profile/email')
  async updateProfileEmail(
    @UserSession() user: IJwtPayload,
    @Body() body: ChangeProfileEmailDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.updateProfileEmail(user, body);
  }

  @Put('/profile')
  async updateProfile(
    @UserSession() user: IJwtPayload,
    @Body() body: ChangeProfileDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.updateProfile(user, body);
  }

  @Put('/onboarding')
  @ApiOperation({
    summary: 'Update onboarding',
  })
  @ExternalApiAccessible()
  async updateOnBoarding(
    @UserSession() user: IJwtPayload,
    @Body() body: UserOnboardingRequestDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.updateOnBoarding(user, body);
  }

  @Put('/onboarding-tour')
  async updateOnBoardingTour(
    @UserSession() user: IJwtPayload,
    @Body() body: UserOnboardingTourRequestDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.updateOnBoardingTour(user, body);
  }

  @Put('/guide/:type')
  async updateGuide(
    @UserSession() user: IJwtPayload,
    @Param('type') type: string,
  ) {
    return this.usersService.updateGuide(user, type);
  }

  @Post('/bug/submit')
  async submitBugReport(
    @UserSession() user: IJwtPayload,
    @Body() payload: SubmitBugRequestDto,
  ) {
    return this.usersService.submitBugFromWeb(user, payload);
  }
}
