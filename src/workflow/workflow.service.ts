import { ProducerService } from '@app/kafka/producer/producer.service';
import { EdgeRepository } from '@libs/repositories/edge';
import { EmailTemplateRepository } from '@libs/repositories/email-templates';
import { NodeRepository } from '@libs/repositories/node';
import {
  VariableRepository,
  variableWorkflowDefault,
} from '@libs/repositories/variable';
import {
  WorkflowEntity,
  WorkflowRepository,
} from '@libs/repositories/workflow';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { EventTypes, IJwtPayload, WorkflowId } from '@wolfxlabs/stateless';
import { v4 as uuidv4 } from 'uuid';
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
} from './dtos';

@Injectable()
export class WorkflowService {
  constructor(
    private workflowRepository: WorkflowRepository,
    private nodeRepository: NodeRepository,
    private edgeRepository: EdgeRepository,
    private emailTemplateRepository: EmailTemplateRepository,
    private variableRepository: VariableRepository,
    private readonly producerService: ProducerService,
  ) {}

  async getWorkflows(u: IJwtPayload, d: WorkflowsRequestDto) {
    const data = await this.workflowRepository.findListWf(
      u.environmentId,
      u.organizationId,
    );

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
      viewport: e.viewport,
    }));

    return {
      page: d.page,
      data: workflows,
      totalCount: data.total,
      pageSize: d.limit,
    };
  }

  async createWorkflow(u: IJwtPayload, payload: CreateWorkflowRequestDto) {
    const wf: WorkflowEntity = await this.workflowRepository.create({
      name: payload.name,
      tags: payload.tags,
      description: payload.description,
      identifier: uuidv4(),
      _userId: u._id,
      _environmentId: u.environmentId,
      _organizationId: u.organizationId,
    });

    await this.nodeRepository.create({
      type: 'starter',
      data: { label: 'starter node' },
      _workflowId: wf._id,
      position: { x: 0, y: 0 },
    });

    for (const iVariable of variableWorkflowDefault) {
      await this.variableRepository.create({
        ...iVariable,
        _workflowId: wf._id,
      });
    }

    return wf;
  }

  async deleteWorkflow(u: IJwtPayload, workflowId: string) {
    if (!workflowId || '' === workflowId)
      return new PreconditionFailedException('Workflow Id is required');

    const workflows = await this.workflowRepository.find({
      _userId: u._id,
      _environmentId: u.environmentId,
      _organizationId: u.organizationId,
    });

    const nodes = await this.nodeRepository.findByWorkflowId(workflowId);
    const edges = await this.edgeRepository.findByWorkflowId(workflowId);

    for (const workflow of workflows) {
      if (workflow._id != workflowId) {
        await this.workflowRepository.updateActive(workflow._id, u._id);
        break;
      }
    }

    await this.workflowRepository.delete({
      _userId: u._id,
      _id: {
        $in: [workflowId],
      },
    });

    await this.nodeRepository.delByIds(nodes.map((e) => e._id));
    await this.edgeRepository.delByIds(edges.map((e) => e.id));
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
        providerName: payload.providerName,
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
    const wf = await this.workflowRepository.getActive(
      u.environmentId,
      u.organizationId,
    );

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
      viewport: wf.viewport,
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
      viewport: wf.viewport,
    };
  }

  async delNodeEdge(u: IJwtPayload, payload: DelEleWorkflowRequestDto) {
    const nodeIds = payload.nodeIds;
    const edgeIds = payload.edgeIds;

    await this.nodeRepository.delByIds(nodeIds);
    await this.edgeRepository.delByIds(edgeIds);
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

    this.producerService.sendEvent<{ workflowId: string }>(
      EventTypes['workflow.updated'],
      {
        type: EventTypes['workflow.updated'],
        createdAt: new Date(),
        data: {
          workflowId: payload.workflowId,
        },
      },
    );

    return this.workflowRepository.updateOne(
      {
        _id: payload.workflowId,
        _environmentId: u.environmentId,
        _userId: u._id,
      },
      objForUpdate,
    );
  }

  async updateViewportWorkflow(
    u: IJwtPayload,
    payload: UpdateViewPortWorkflowRequestDto,
  ) {
    return this.workflowRepository.updateOne(
      {
        _id: payload.workflowId,
        _userId: u._id,
        _environmentId: u.environmentId,
      },
      {
        viewport: payload,
      },
    );
  }

  async getEmailTemplates(skip = 0, limit = 10) {
    return await this.emailTemplateRepository.findByPage(skip, limit);
  }

  async createEmailTemplate(u: IJwtPayload, payload: CreateEmailTemplateDto) {
    return await this.emailTemplateRepository.create({
      design: payload.design,
      name: payload.name,
      preview: payload.preview,
      identifier: uuidv4(),
      _userId: u._id,
    });
  }

  async updateEmailTemplate(
    u: IJwtPayload,
    payload: CreateEmailTemplateDto,
    id: string,
  ) {
    return await this.emailTemplateRepository.updateOne(
      {
        _id: id,
        _userId: u._id,
      },
      {
        design: payload.design,
        name: payload.name,
        preview: payload.preview,
      },
    );
  }

  async makePublicEmailTemplate(u: IJwtPayload, id: string) {
    return await this.emailTemplateRepository.updateOne(
      {
        _id: id,
        _userId: u._id,
      },
      {
        free: true,
      },
    );
  }

  async getVariables(u: IJwtPayload, workflowId: WorkflowId) {
    return await this.variableRepository.findByWfId(workflowId);
  }

  async saveVariables(
    u: IJwtPayload,
    payload: ChangeVariablesWorkflowRequestDto[],
  ) {
    for (const v of payload) {
      if (v._id) {
        await this.variableRepository.updateOne(
          {
            _id: v._id,
          },
          {
            _workflowId: v.workflowId,
            name: v.name,
            defaultValue: v.defaultValue,
            type: v.type,
            required: v.required,
          },
        );
      } else {
        await this.variableRepository.create({
          _workflowId: v.workflowId,
          name: v.name,
          defaultValue: v.defaultValue,
          type: v.type,
        });
      }
    }
  }
}
