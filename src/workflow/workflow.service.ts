import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WorkflowsRequestDto } from '@app/workflow/dto/workflows-request.dto';
import { IJwtPayload } from '@libs/shared/types';
import { WorkflowResponse } from '@app/workflow/dto/workflow-response.dto';
import { WorkflowRepository } from '@libs/repositories/workflow/workflow.repository';
import {
  CreateWorkflowRequestDto,
  UpdateWorkflowRequestDto,
} from '@app/workflow/dto';
import { AddNodeWorkflowRequestDto } from '@app/workflow/dto/add-node-workflow.request.dto';
import { NodeRepository } from '@libs/repositories/node/node.repository';
import { EdgeRepository } from '@libs/repositories/edge/edge.repository';
import { UpdateActiveWorkflowRequestDto } from '@app/workflow/dto/update-active-workflow-request.dto';
import { AddEdgeWorkflowRequestDto } from '@app/workflow/dto/add-edge-workflow.request.dto';
import { UpdateNodeWorkflowRequestDto } from '@app/workflow/dto/update-node-workflow.request.dto';
import { DelEleWorkflowRequestDto } from '@app/workflow/dto/del-ele-workflow.request.dto';
import { v4 as uuidv4 } from 'uuid';
import { EmailTemplateRepository } from '@libs/repositories/email-templates/email-template.repository';
import { SetProviderNodeWorkflowRequestDto } from '@app/workflow/dto/set-provider-node-workflow.request.dto';
import { VariableRepository } from '@libs/repositories/variable/variable.repository';
import { WorkflowId } from '@libs/repositories/workflow/types';
import { ChangeVariablesWorkflowRequestDto } from '@app/workflow/dto/change-variables-workflow.request.dto';

@Injectable()
export class WorkflowService {
  constructor(
    private workflowRepository: WorkflowRepository,
    private nodeRepository: NodeRepository,
    private edgeRepository: EdgeRepository,
    private emailTemplateRepository: EmailTemplateRepository,
    private variableRepository: VariableRepository,
  ) {}

  async getWorkflows(u: IJwtPayload, d: WorkflowsRequestDto) {
    const data = await this.workflowRepository.findByUserId(u._id);

    const workflows: WorkflowResponse[] = data.workflows.map((e) => ({
      _id: e._id,
      _environmentId: e._environmentId,
      _organizationId: e._organizationId,
      _userId: e._userId,
      active: e.active,
      tags: e.tags,
      deleted: e.deleted,
      deletedAt: e.deletedAt,
      description: e.description,
      deletedBy: e.deletedBy,
      name: e.name,
      identifier: e.identifier,
    }));

    return {
      page: d.page,
      data: workflows,
      totalCount: data.total,
      pageSize: d.limit,
    };
  }

  async createWorkflow(u: IJwtPayload, payload: CreateWorkflowRequestDto) {
    return this.workflowRepository.create({
      name: payload.name,
      tags: payload.tags,
      description: payload.description,
      identifier: uuidv4(),
      _userId: u._id,
      _environmentId: u.environmentId,
      _organizationId: u.organizationId,
    });
  }

  async getOneNode(nodeId: string) {
    return await this.nodeRepository.findById(nodeId);
  }

  async addNodeToWorkflow(u: IJwtPayload, payload: AddNodeWorkflowRequestDto) {
    return this.nodeRepository.create({
      _workflowId: payload.workflowId,
      ...payload,
      connected: false,
    });
  }

  async updateNodeToWorkflow(
    u: IJwtPayload,
    payload: UpdateNodeWorkflowRequestDto[],
  ) {
    for (const e of payload) {
      await this.nodeRepository.updateOne(
        {
          _id: e.id,
        },
        {
          ...e,
        },
      );
    }
  }

  async setProviderNode(
    u: IJwtPayload,
    payload: SetProviderNodeWorkflowRequestDto,
  ) {
    await this.nodeRepository.updateOne(
      {
        _id: payload.id,
      },
      {
        _providerId: payload.providerId,
        updatedAt: new Date(),
      },
    );
  }

  async addEdgeToWorkflow(u: IJwtPayload, payload: AddEdgeWorkflowRequestDto) {
    return this.edgeRepository.create({
      _workflowId: payload.workflowId,
      ...payload,
    });
  }

  async updateActive(u: IJwtPayload, payload: UpdateActiveWorkflowRequestDto) {
    await this.workflowRepository.updateActive(payload.workflowId, u._id);
  }

  async getActive(u: IJwtPayload): Promise<WorkflowResponse> {
    const wf = await this.workflowRepository.getActive(u._id);

    if (!wf) return null;

    const nodes = await this.nodeRepository.findByWorkflowId(wf._id);
    const edges = await this.edgeRepository.findByWorkflowId(wf._id);

    return {
      deletedAt: wf.deletedAt,
      deletedBy: wf.deletedBy,
      _id: wf._id,
      _environmentId: wf._environmentId,
      _organizationId: wf._organizationId,
      _userId: wf._userId,
      active: wf.active,
      tags: wf.tags,
      deleted: wf.deleted,
      name: wf.name,
      description: wf.description,
      nodes,
      edges,
      identifier: wf.identifier,
    };
  }

  async getDetail(id: string): Promise<WorkflowResponse> {
    const wf = await this.workflowRepository.findById(id);
    if (!wf) throw new NotFoundException('Workflow not existed');

    const nodes = await this.nodeRepository.findByWorkflowId(wf._id);
    const edges = await this.edgeRepository.findByWorkflowId(wf._id);

    return {
      deletedAt: wf.deletedAt,
      deletedBy: wf.deletedBy,
      _id: wf._id,
      _environmentId: wf._environmentId,
      _organizationId: wf._organizationId,
      _userId: wf._userId,
      active: wf.active,
      tags: wf.tags,
      deleted: wf.deleted,
      name: wf.name,
      description: wf.description,
      nodes,
      edges,
      identifier: wf.identifier,
    };
  }

  async delNodeEdge(u: IJwtPayload, payload: DelEleWorkflowRequestDto) {
    const nodeIds = payload.nodeIds;
    const edgeIds = payload.edgeIds;

    this.nodeRepository.delByIds(nodeIds);
    this.edgeRepository.delByIds(edgeIds);
  }

  async updateWorkflow(u: IJwtPayload, payload: UpdateWorkflowRequestDto) {
    const objForUpdate: any = {};
    const wf =
      await this.workflowRepository.findOneByUserIdAndNameAndWorkflowIdNotEqual(
        u._id,
        payload.name,
        payload.workflowId,
      );

    if (wf) throw new ConflictException('Workflow name existed');

    if (payload.name) objForUpdate.name = payload.name;
    if (payload.description) objForUpdate.description = payload.description;
    if (payload.tags) objForUpdate.tags = payload.tags;

    return this.workflowRepository.updateOne(
      {
        _id: payload.workflowId,
      },
      objForUpdate,
    );
  }

  async getEmailTemplates(skip = 0, limit = 10) {
    return await this.emailTemplateRepository.findByPage(skip, limit);
  }

  async getVariables(u: IJwtPayload, workflowId: WorkflowId) {
    return await this.variableRepository.findByWfId(workflowId);
  }

  async saveVariables(
    u: IJwtPayload,
    payload: ChangeVariablesWorkflowRequestDto[],
  ) {
    for (const v of payload) {
      this.variableRepository.create({
        _workflowId: v.workflowId,
        name: v.name,
        defaultValue: v.defaultValue,
        type: v.type,
      });
    }
  }
}
