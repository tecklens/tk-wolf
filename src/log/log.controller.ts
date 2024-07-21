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
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';
import { LogService } from '@app/log/log.service';
import { FilterLogDto } from '@app/log/dtos/filter-log.dto';
import { UserSession } from '@libs/utils/user.session';
import { FilterLogResponse } from '@app/log/dtos/filter-log.response';
import { DashboardInfoDto } from '@app/log/dtos/dashboard-info.dto';
import {
  ApiResponse,
  ExternalApiAccessible,
  IJwtPayload,
} from '@wolf/stateless';

@Controller('log')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Log')
@ApiExcludeController()
export class LogController {
  constructor(private readonly logService: LogService) {}
  @Get('/analyse')
  @ApiResponse(FilterLogResponse, 200)
  @ApiOperation({
    summary: 'API get analysis of user',
  })
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getLogTrigger(
    @UserSession() user: IJwtPayload,
    @Query() payload: FilterLogDto,
  ): Promise<FilterLogResponse> {
    return this.logService.analysisLog(user, payload);
  }

  @Get('/analyse/task-error')
  @ApiResponse(FilterLogResponse, 200)
  @ApiOperation({
    summary: 'API get analysis error of user',
  })
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getTaskErrorAnalyse(
    @UserSession() user: IJwtPayload,
    @Query() payload: FilterLogDto,
  ): Promise<FilterLogResponse> {
    return this.logService.analysisTaskError(user, payload);
  }

  @Get('/analyse/billing')
  @ApiResponse(FilterLogResponse, 200)
  @ApiOperation({
    summary: 'API get log billing of user',
  })
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getBillingAnalyse(
    @UserSession() user: IJwtPayload,
    @Query() payload: FilterLogDto,
  ): Promise<FilterLogResponse> {
    return this.logService.analysisBilling(user, payload);
  }

  @Get('/dashboard')
  @ApiResponse(DashboardInfoDto, 200)
  @ApiOperation({
    summary: 'API measurement dashboard',
  })
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getDashboardInfo(
    @UserSession() user: IJwtPayload,
  ): Promise<DashboardInfoDto> {
    return this.logService.getDashboardInfo(user);
  }
}
