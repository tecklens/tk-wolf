import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
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
import { UserSession } from "@libs/utils/user.session";
import { IJwtPayload } from "@libs/shared/types";

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

  @Get('/task')
  @ApiResponse(CreateTriggerResponse, 200)
  @ApiOperation({
    summary: 'API get task of workflow',
  })
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getTask(@Query() payload: GetTaskRequestDto): Promise<TaskResponseDto> {
    return this.taskService.getTasks(payload);
  }
}
