import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
import { TriggerService } from '@app/trigger/trigger.service';
import { ExternalApiAccessible } from '@tps/decorators/external-api.decorator';
import { ApiResponse } from '@tps/decorators/api-response.decorator';
import { CreateTriggerDto } from '@app/trigger/dtos/create-trigger.dto';
import { CreateTriggerResponse } from '@app/trigger/dtos/create-trigger.response';
import { ApiKeyAuthGuard } from '@app/auth/strategy/apikey.guard';
import { GetTaskRequestDto } from '@app/trigger/dtos/get-task.request';
import { TaskEntity } from '@libs/repositories/task/task.entity';
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';
import { TaskService } from '@app/trigger/task.service';
import { TaskResponseDto } from '@app/trigger/dtos/get-task.response.dto';
import { UserSession } from '@libs/utils/user.session';
import { IJwtPayload } from '@libs/shared/types';
import { GetLogTriggerRequestDto } from '@app/trigger/dtos/get-log-trigger.request';
import { GetLogTriggerResponseDto } from '@app/trigger/dtos/get-log-trigger.response.dto';
import { CreateBulkTriggerDto } from "@app/trigger/dtos/create-bulk-trigger.dto";

@ApiBearerAuth()
@Controller('trigger')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Trigger')
@ApiExcludeController()
export class TriggerController {
  constructor(
    private readonly triggerService: TriggerService,
    private readonly taskService: TaskService,
  ) {}

  @Post('/')
  @ApiResponse(CreateTriggerResponse, 200)
  @ApiOperation({
    summary: 'API save trigger and exe workflow',
  })
  @UseGuards(ApiKeyAuthGuard)
  @ExternalApiAccessible()
  createTrigger(
    @UserSession() user: IJwtPayload,
    @Body() payload: CreateTriggerDto,
  ): Promise<CreateTriggerResponse> {
    return this.triggerService.createTrigger(user, payload);
  }

  @Post('/bulk')
  @ApiResponse(CreateTriggerResponse, 200)
  @ApiOperation({
    summary: 'API save trigger and exe workflow',
  })
  @UseGuards(ApiKeyAuthGuard)
  @ExternalApiAccessible()
  createBulkTrigger(
    @UserSession() user: IJwtPayload,
    @Body() payload: CreateBulkTriggerDto,
  ): Promise<CreateTriggerResponse> {
    return this.triggerService.createBulkTrigger(user, payload);
  }

  @Get('/task')
  @ApiResponse(CreateTriggerResponse, 200)
  @ApiOperation({
    summary: 'API get task of workflow',
  })
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getTask(
    @UserSession() user: IJwtPayload,
    @Query() payload: GetTaskRequestDto,
  ): Promise<TaskResponseDto> {
    return this.taskService.getTasks(user, payload);
  }

  @Delete('/task/:code')
  @ApiResponse(null, 200)
  @ApiOperation({
    summary: 'API del log task of user',
  })
  @UseGuards(JwtAuthGuard)
  delTask(@UserSession() user: IJwtPayload, @Param('code') code: string) {
    return this.taskService.delTask(user, code);
  }

  @Get('/logs')
  @ApiResponse(CreateTriggerResponse, 200)
  @ApiOperation({
    summary: 'API get log trigger',
  })
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getLogTrigger(
    @UserSession() user: IJwtPayload,
    @Query() payload: GetLogTriggerRequestDto,
  ): Promise<GetLogTriggerResponseDto> {
    return this.triggerService.getLogTrigger(user, payload);
  }

  @Delete('/log/:id')
  @ApiResponse(null, 200)
  @ApiOperation({
    summary: 'API del log task of user',
  })
  @UseGuards(JwtAuthGuard)
  delLogTrigger(@UserSession() user: IJwtPayload, @Param('id') id: string) {
    return this.triggerService.delLogTrigger(user, id);
  }
}
