import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
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
import { ExternalApiAccessible } from '@tps/decorators/external-api.decorator';
import { UserSession } from '@libs/utils/user.session';
import { WorkflowsResponseDto } from '@app/workflow/dto/workflows.response.dto';
import { ApiResponse } from '@tps/decorators/api-response.decorator';
import { IJwtPayload } from '@libs/shared/types';
import { WorkflowsRequestDto } from '@app/workflow/dto/workflows-request.dto';
import { WorkflowService } from '@app/workflow/workflow.service';
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';
import {
  CreateWorkflowRequestDto,
  UpdateWorkflowRequestDto,
} from '@app/workflow/dto';
import { AddNodeWorkflowRequestDto } from '@app/workflow/dto/add-node-workflow.request.dto';
import { UpdateActiveWorkflowRequestDto } from '@app/workflow/dto/update-active-workflow-request.dto';
import { WorkflowEntity } from '@libs/repositories/workflow/workflow.entity';
import { WorkflowResponse } from '@app/workflow/dto/workflow-response.dto';
import { AddEdgeWorkflowRequestDto } from '@app/workflow/dto/add-edge-workflow.request.dto';
import { UpdateNodeWorkflowRequestDto } from '@app/workflow/dto/update-node-workflow.request.dto';
import { DelEleWorkflowRequestDto } from '@app/workflow/dto/del-ele-workflow.request.dto';
import { EmailTemplateEntity } from '@libs/repositories/email-templates/email-template.entity';
import { SetProviderNodeWorkflowRequestDto } from '@app/workflow/dto/set-provider-node-workflow.request.dto';

@ApiBearerAuth()
@Controller('wf')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Workflow')
@ApiExcludeController()
export class WorkflowController {
  constructor(private workflowService: WorkflowService) {}
  @Get('/detail/:id')
  @ApiResponse(WorkflowResponse)
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getOne(@Param('id') id: string): Promise<WorkflowResponse> {
    return this.workflowService.getDetail(id);
  }

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

  @Put('/')
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  updateWorkflow(
    @UserSession() user: IJwtPayload,
    @Body() payload: UpdateWorkflowRequestDto,
  ) {
    return this.workflowService.updateWorkflow(user, payload);
  }

  @Get('/node/:id')
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getOneNode(@Param('id') id: string) {
    return this.workflowService.getOneNode(id);
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

  @Put('/node')
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  updateNode(
    @UserSession() user: IJwtPayload,
    @Body() payload: UpdateNodeWorkflowRequestDto[],
  ) {
    return this.workflowService.updateNodeToWorkflow(user, payload);
  }

  @Post('/node/provider')
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  setProviderNode(
    @UserSession() user: IJwtPayload,
    @Body() payload: SetProviderNodeWorkflowRequestDto,
  ) {
    return this.workflowService.setProviderNode(user, payload);
  }

  @Post('/edge')
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  addEdge(
    @UserSession() user: IJwtPayload,
    @Body() payload: AddEdgeWorkflowRequestDto,
  ) {
    return this.workflowService.addEdgeToWorkflow(user, payload);
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
  getActiveWorkflow(
    @UserSession() user: IJwtPayload,
  ): Promise<WorkflowResponse> {
    return this.workflowService.getActive(user);
  }

  @Post('/node/del')
  @ApiResponse(WorkflowEntity)
  @ApiOperation({
    summary: 'del node + edge in workflows',
  })
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  delNodeEdge(
    @UserSession() user: IJwtPayload,
    @Body() payload: DelEleWorkflowRequestDto,
  ) {
    this.workflowService.delNodeEdge(user, payload);
  }

  @Get('/email/templates')
  getEmailTemplates(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
  ): Promise<EmailTemplateEntity[]> {
    return this.workflowService.getEmailTemplates(skip, limit);
  }
}
