import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeController,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ExternalApiAccessible } from '@tps/decorators/external-api.decorator';
import { UserSession } from '@libs/utils/user.session';
import { IJwtPayload } from '@libs/shared/types';
import { ApiKey } from '@libs/shared/dto/api-key';
import { EnvironmentService } from '@app/environment/environment.service';
import { EnvironmentResponseDto } from '@app/environment/dtos/environment-response.dto';
import { ApiResponse } from '@tps/decorators/api-response.decorator';
import { CreateEnvironmentRequestDto } from '@app/environment/dtos/create-environment-request.dto';
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';

@ApiBearerAuth()
@Controller('environment')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Environment')
@ApiExcludeController()
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}

  @Get('/me')
  @ApiOperation({
    summary: 'Get current environment',
  })
  @ApiResponse(EnvironmentResponseDto)
  @ExternalApiAccessible()
  async getCurrentEnvironment(
    @UserSession() user: IJwtPayload,
  ): Promise<EnvironmentResponseDto> {
    return await this.environmentService.getMeEnvironment(user);
  }

  @Post('/')
  @ApiOperation({
    summary: 'Create environment',
  })
  @UseGuards(JwtAuthGuard)
  @ApiExcludeEndpoint()
  @ApiResponse(EnvironmentResponseDto, 201)
  async createEnvironment(
    @UserSession() user: IJwtPayload,
    @Body() body: CreateEnvironmentRequestDto,
  ): Promise<EnvironmentResponseDto> {
    return await this.environmentService.createEnvironment(user, body, null);
  }

  @Get('/')
  @ApiOperation({
    summary: 'Get environments',
  })
  @ApiResponse(EnvironmentResponseDto, 200, true)
  @ExternalApiAccessible()
  async getMyEnvironments(
    @UserSession() user: IJwtPayload,
  ): Promise<EnvironmentResponseDto[]> {
    return await this.environmentService.getListEnvironment({
      environmentId: user.environmentId,
      userId: user._id,
      organizationId: user.organizationId,
    });
  }

  @Post('/api-keys/regenerate')
  @ApiOperation({
    summary: 'Regenerate api keys',
  })
  @ExternalApiAccessible()
  async regenerateOrganizationApiKeys(
    @UserSession() user: IJwtPayload,
  ): Promise<ApiKey[]> {
    return await this.environmentService.regenerateUniqueApiKey(user);
  }

  @Get('/api-keys')
  @ApiOperation({
    summary: 'Get api keys',
  })
  @ExternalApiAccessible()
  async getOrganizationApiKeys(
    @UserSession() user: IJwtPayload,
  ): Promise<ApiKey[]> {
    return await this.environmentService.getApiKey(user);
  }
}
