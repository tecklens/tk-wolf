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
import { UserSession } from '@libs/utils/user.session';
import { WorkflowService } from '@app/workflow/workflow.service';
import { JwtAuthGuard } from '@app/auth/strategy';
import {
  ApiResponse,
  ExternalApiAccessible,
  IEmailTemplate,
  IJwtPayload,
} from '@wolfxlabs/stateless';
import {
  AddEdgeWorkflowRequestDto,
  AddNodeWorkflowRequestDto,
  ChangeVariablesWorkflowRequestDto,
  CreateEmailTemplateDto,
  CreateWorkflowRequestDto,
  DelEleWorkflowRequestDto,
  SetProviderNodeWorkflowRequestDto,
  UpdateActiveWorkflowRequestDto,
  UpdateNodeWorkflowRequestDto,
  UpdateViewPortWorkflowRequestDto,
  UpdateWorkflowRequestDto,
  WorkflowResponse,
  WorkflowsRequestDto,
  WorkflowsResponseDto,
} from './dtos';
import { WorkflowEntity } from '@libs/repositories/workflow';

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

  @Delete('/:workflowId')
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  deleteWorkflow(
    @UserSession() user: IJwtPayload,
    @Param('workflowId') workflowId: string,
  ) {
    return this.workflowService.deleteWorkflow(user, workflowId);
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

  @Put('/viewport')
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  updateWorkflowViewPort(
    @UserSession() user: IJwtPayload,
    @Body() payload: UpdateViewPortWorkflowRequestDto,
  ) {
    return this.workflowService.updateViewportWorkflow(user, payload);
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
    return this.workflowService.delNodeEdge(user, payload);
  }

  @Get('/email/templates')
  getEmailTemplates(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
  ): Promise<IEmailTemplate[]> {
    return this.workflowService.getEmailTemplates(skip, limit);
  }

  @Post('/email/template')
  @UseGuards(JwtAuthGuard)
  createEmailTemplate(
    @UserSession() user: IJwtPayload,
    @Body() payload: CreateEmailTemplateDto,
  ) {
    return this.workflowService.createEmailTemplate(user, payload);
  }

  @Put('/email/template/:id')
  @UseGuards(JwtAuthGuard)
  updateEmailTemplate(
    @UserSession() user: IJwtPayload,
    @Body() payload: CreateEmailTemplateDto,
    @Param('id') id: string,
  ) {
    return this.workflowService.updateEmailTemplate(user, payload, id);
  }

  @Put('/email/template/make-public/:id')
  @UseGuards(JwtAuthGuard)
  makePublicEmailTemplate(
    @UserSession() user: IJwtPayload,
    @Param('id') id: string,
  ) {
    return this.workflowService.makePublicEmailTemplate(user, id);
  }

  @Post('/variable')
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  changeVariableWf(
    @UserSession() user: IJwtPayload,
    @Body() payload: ChangeVariablesWorkflowRequestDto[],
  ) {
    return this.workflowService.saveVariables(user, payload);
  }

  @Get('/variable/:wfId')
  @ExternalApiAccessible()
  @UseGuards(JwtAuthGuard)
  getVariables(@UserSession() user: IJwtPayload, @Param('wfId') wfId: string) {
    return this.workflowService.getVariables(user, wfId);
  }
}
