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
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiKeyAuthGuard } from '@app/auth/strategy/apikey.guard';
import { ExternalApiAccessible } from '@tps/decorators/external-api.decorator';
import { UserSession } from '@libs/utils/user.session';
import { WorkflowsResponseDto } from '@app/workflow/dto/workflows.response.dto';
import { ApiResponse } from '@tps/decorators/api-response.decorator';
import { IJwtPayload } from '@libs/shared/types';
import { WorkflowsRequestDto } from '@app/workflow/dto/workflows-request.dto';
import { WorkflowService } from '@app/workflow/workflow.service';
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';
import { CreateWorkflowRequestDto } from '@app/workflow/dto';
import { AddNodeWorkflowRequestDto } from '@app/workflow/dto/add-node-workflow.request.dto';
import { UpdateActiveWorkflowRequestDto } from '@app/workflow/dto/update-active-workflow-request.dto';
import { WorkflowEntity } from '@libs/repositories/workflow/workflow.entity';

@ApiBearerAuth()
@Controller('wf')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Workflow')
@ApiExcludeController()
export class WorkflowController {
  constructor(private workflowService: WorkflowService) {}
  @Get('/detail/:id')
  @UseGuards(ApiKeyAuthGuard)
  @ExternalApiAccessible()
  getOne(@Param('id') id: string) {}

  @Get('/')
  @ApiResponse(WorkflowsResponseDto)
  @ApiOperation({
    summary: 'Get workflows',
    description: `Workflows were previously named notification templates`,
  })
  @ExternalApiAccessible()
  getWorkflows(
    @UserSession() user: IJwtPayload,
    @Query() queryParams: WorkflowsRequestDto,
  ): Promise<WorkflowsResponseDto> {
    return this.workflowService.getWorkflows(user, queryParams);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  createWorkflow(
    @UserSession() user: IJwtPayload,
    @Body() payload: CreateWorkflowRequestDto,
  ) {
    return this.workflowService.createWorkflow(user, payload);
  }

  @Post('/node')
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  addNode(
    @UserSession() user: IJwtPayload,
    @Body() payload: AddNodeWorkflowRequestDto,
  ) {
    return this.workflowService.addNodeToWorkflow(user, payload);
  }

  @Put('/active')
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  updateActiveWorkflow(
    @UserSession() user: IJwtPayload,
    @Body() payload: UpdateActiveWorkflowRequestDto,
  ) {
    return this.workflowService.updateActive(user, payload);
  }

  @Get('/active')
  @ApiResponse(WorkflowEntity)
  @ApiOperation({
    summary: 'Get active workflows',
  })
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getActiveWorkflow(@UserSession() user: IJwtPayload): Promise<WorkflowEntity> {
    return this.workflowService.getActive(user);
  }
}
