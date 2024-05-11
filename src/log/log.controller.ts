import {
  ClassSerializerInterceptor,
  Controller,
  Get,
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
import { ApiResponse } from '@tps/decorators/api-response.decorator';
import { CreateTriggerResponse } from '@app/trigger/dtos/create-trigger.response';
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';
import { ExternalApiAccessible } from '@tps/decorators/external-api.decorator';
import { LogService } from '@app/log/log.service';
import { FilterLogDto } from '@app/log/dtos/filter-log.dto';
import { UserSession } from '@libs/utils/user.session';
import { IJwtPayload } from '@libs/shared/types';
import { FilterLogResponse } from '@app/log/dtos/filter-log.response';

@Controller('log')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Log')
@ApiExcludeController()
export class LogController {
  constructor(private readonly logService: LogService) {}
  @Get('/analyse')
  @ApiResponse(CreateTriggerResponse, 200)
  @ApiOperation({
    summary: 'API get analysis of user',
  })
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getTask(
    @UserSession() user: IJwtPayload,
    @Query() payload: FilterLogDto,
  ): Promise<FilterLogResponse> {
    return this.logService.analysisLog(user, payload);
  }
}
