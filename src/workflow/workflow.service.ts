import { Injectable } from '@nestjs/common';
import { WorkflowsRequestDto } from '@app/workflow/dto/workflows-request.dto';
import { IJwtPayload } from '@libs/shared/types';
import { WorkflowResponse } from '@app/workflow/dto/workflow-response.dto';
import { WorkflowRepository } from '@libs/repositories/workflow/workflow.repository';
import { CreateWorkflowRequestDto } from '@app/workflow/dto';
import { AddNodeWorkflowRequestDto } from '@app/workflow/dto/add-node-workflow.request.dto';
import { NodeRepository } from '@libs/repositories/node/node.repository';
import { EdgeRepository } from '@libs/repositories/edge/edge.repository';
import { UpdateActiveWorkflowRequestDto } from '@app/workflow/dto/update-active-workflow-request.dto';

@Injectable()
export class WorkflowService {
  constructor(
    private workflowRepository: WorkflowRepository,
    private nodeRepository: NodeRepository,
    private edgeRepository: EdgeRepository,
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
      _userId: u._id,
      _environmentId: u.environmentId,
      _organizationId: u.organizationId,
    });
  }

  async addNodeToWorkflow(u: IJwtPayload, payload: AddNodeWorkflowRequestDto) {
    return this.nodeRepository.create({
      _workflowId: payload.workflowId,
      ...payload,
    });
  }

  async updateActive(u: IJwtPayload, payload: UpdateActiveWorkflowRequestDto) {
    this.workflowRepository.updateActive(payload.workflowId, u._id);
  }

  async getActive(u: IJwtPayload) {
    return this.workflowRepository.getActive(u._id);
  }
}
