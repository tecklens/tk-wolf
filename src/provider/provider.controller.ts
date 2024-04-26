import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeController,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponse } from '@tps/decorators/api-response.decorator';
import { ExternalApiAccessible } from '@tps/decorators/external-api.decorator';
import { UserSession } from '@libs/utils/user.session';
import { IJwtPayload } from '@libs/shared/types';
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';
import { CreateIntegrationRequestDto } from '@app/provider/dtos/create-integration-request.dto';
import { IntegrationResponseDto } from '@app/provider/dtos/integration-response.dto';
import { ProviderService } from '@app/provider/provider.service';
import { ProviderEntity } from "@libs/repositories/provider";

@Controller('provider')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Provider')
@ApiExcludeController()
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}
  @Post('/')
  @ApiResponse(IntegrationResponseDto, 201)
  @ApiOperation({
    summary: 'Create integration',
    description:
      'Create an integration for the current environment the user is based on the API key provided',
  })
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  async createIntegration(
    @UserSession() user: IJwtPayload,
    @Body() body: CreateIntegrationRequestDto,
  ): Promise<ProviderEntity> {
    return await this.providerService.createProvider(user, body);
    //   {
    //     userId: user._id,
    //     name: body.name,
    //     identifier: body.identifier,
    //     environmentId: body._environmentId ?? user.environmentId,
    //     organizationId: user.organizationId,
    //     providerId: body.providerId,
    //     channel: body.channel,
    //     credentials: body.credentials,
    //     active: body.active ?? false,
    //     check: body.check ?? true,
    //     conditions: body.conditions,
    //   },
    // );
  }
}
