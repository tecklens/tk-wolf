import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponse } from '@tps/decorators/api-response.decorator';
import { ExternalApiAccessible } from '@tps/decorators/external-api.decorator';
import { UserSession } from '@libs/utils/user.session';
import { IJwtPayload } from '@libs/shared/types';
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';
import { CreateProviderRequestDto } from '@app/provider/dtos/create-provider-request.dto';
import { ProviderResponseDto } from '@app/provider/dtos/provider-response.dto';
import { ProviderService } from '@app/provider/provider.service';
import { ProviderEntity } from '@libs/repositories/provider';
import { GetProviderRequestDto } from '@app/provider/dtos/get-provider-request.dto';

@Controller('provider')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Provider')
@ApiExcludeController()
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}
  @Post('/')
  @ApiResponse(ProviderResponseDto, 201)
  @ApiOperation({
    summary: 'Create integration',
    description:
      'Create an integration for the current environment the user is based on the API key provided',
  })
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  async createProvider(
    @UserSession() user: IJwtPayload,
    @Body() body: CreateProviderRequestDto,
  ): Promise<ProviderEntity> {
    return await this.providerService.createProvider(user, body);
  }

  @Put('/:id')
  @ApiResponse(ProviderResponseDto, 201)
  @ApiOperation({
    summary: 'Create integration',
    description: 'Update an integration for the current environment',
  })
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  async updateProvider(
    @UserSession() user: IJwtPayload,
    @Param('id') id: string,
    @Body() body: CreateProviderRequestDto,
  ): Promise<void> {
    return await this.providerService.updateProvider(user, id, body);
  }

  @Get('/')
  @ApiOkResponse({
    type: [ProviderResponseDto],
    description:
      'The list of integrations belonging to the organization that are successfully returned.',
  })
  @ApiOperation({
    summary: 'Get integrations',
    description:
      'Return all the integrations the user has created for that organization. Review v.0.17.0 changelog for a breaking change',
  })
  @ExternalApiAccessible()
  async getListProvider(
    @UserSession() user: IJwtPayload,
    @Query() body: GetProviderRequestDto,
  ): Promise<ProviderResponseDto[]> {
    // @ts-ignore
    return this.providerService.getListProvider(user, body);
  }
}
