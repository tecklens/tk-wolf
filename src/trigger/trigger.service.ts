import {
  Injectable,
  Logger,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { get } from 'lodash';
import { getDateDataTimeout } from '@libs/utils';
import { v4 as uuidv4 } from 'uuid';
import { LogRepository } from '@libs/repositories/log';
import {
  WorkflowEntity,
  WorkflowRepository,
} from '@libs/repositories/workflow';
import { VariableRepository } from '@libs/repositories/variable';
import {
  IJwtPayload,
  ILogTrigger,
  INextJob,
  IOverridesDataTrigger,
  ITargetTrigger,
  IVariable,
  WfNodeType,
} from '@wolfxlabs/stateless';
import {
  CreateBulkTriggerDto,
  CreateTriggerDto,
  CreateTriggerResponse,
  GetLogTriggerRequestDto,
  GetLogTriggerResponseDto,
} from './dtos';
import { TaskService } from '@app/trigger/task.service';
import { NodeRepository } from '@libs/repositories/node';
import { EdgeRepository } from '@libs/repositories/edge';
import process from 'process';
import { ProducerService } from '@app/kafka/producer/producer.service';

@Injectable()
export class TriggerService {
  private logger = new Logger('TriggerService');

  constructor(
    private readonly sender: ProducerService,
    private readonly logRepository: LogRepository,
    private readonly workflowRepository: WorkflowRepository,
    private readonly variableRepository: VariableRepository,
    private readonly nodeRepository: NodeRepository,
    private readonly edgeRepository: EdgeRepository,
    private readonly taskService: TaskService,
  ) {}

  async createTrigger(
    user: IJwtPayload,
    payload: CreateTriggerDto,
  ): Promise<CreateTriggerResponse> {
    const wf: WorkflowEntity = await this.workflowRepository.findById(
      payload.workflowId,
      '_id _organizationId _environmentId _userId identifier name',
    );

    if (!wf) throw new NotFoundException('Workflow not found');

    const transactionId = uuidv4();

    const log: ILogTrigger = {
      _userId: wf._userId,
      _organizationId: wf._organizationId,
      _environmentId: wf._environmentId,

      _workflowId: wf._id,
      workflowName: wf.name,
      recipient: payload.target.email ?? payload.target.phone,

      status: 1,
      event_type: 'create_trigger',
      deletedAt: getDateDataTimeout(user.plan),
    };

    try {
      const variables: IVariable[] = await this.variableRepository.findByWfId(
        wf._id,
      );

      await this.validateVariables(variables, payload);

      await this.startTask({
        workflowId: wf._id,
        workflowName: wf.name,
        user: user,
        target: payload.target,
        overrides: payload.overrides,
        transactionId: transactionId,
      });

      log.status = 1;
      await this.logRepository.create(log);
    } catch (e) {
      this.logger.error(e);
      log.status = 2;
      await this.logRepository.create(log);
      throw e;
    }

    return {
      transactionId: transactionId,
    };
  }

  async createBulkTrigger(
    user: IJwtPayload,
    payload: CreateBulkTriggerDto,
  ): Promise<CreateTriggerResponse> {
    const wf: WorkflowEntity = await this.workflowRepository.findById(
      payload.workflowId,
      '_id _organizationId _environmentId _userId identifier name',
    );

    if (!wf) throw new NotFoundException('Workflow not found');

    for (const target of payload.targets) {
      const transactionId = uuidv4();
      const log: ILogTrigger = {
        _userId: wf._userId,
        _organizationId: wf._organizationId,
        _environmentId: wf._environmentId,

        _workflowId: wf._id,
        workflowName: wf.name,
        recipient: target.email ?? target.phone,

        status: 1,
        event_type: 'create_trigger',
        deletedAt: getDateDataTimeout(user.plan),
      };

      try {
        const variables: IVariable[] = await this.variableRepository.findByWfId(
          wf._id,
        );

        await this.validateVariables(variables, {
          workflowId: payload.workflowId,
          target,
          overrides: payload.overrides,
        });

        await this.startTask({
          workflowId: wf._id,
          workflowName: wf.name,
          user: user,
          target: target,
          overrides: payload.overrides,
          transactionId: transactionId,
        });

        log.status = 1;
      } catch (e) {
        this.logger.error(e);
        log.status = 2;
      }

      await this.logRepository.create(log);
    }
    return null;
  }

  private async startTask({
    workflowId,
    workflowName,
    user,
    transactionId,
    target,
    overrides,
  }: {
    workflowId: string;
    workflowName: string;
    user: IJwtPayload;
    transactionId: string;
    target: ITargetTrigger;
    overrides: IOverridesDataTrigger;
  }) {
    const node = await this.nodeRepository.findOneByWorkflowIdAndType(
      workflowId,
      WfNodeType.starter,
    );
    if (node == null)
      throw new NotFoundException('Workflow not have starter node');

    const edges = await this.edgeRepository.findBySource(node._id);

    if (edges.length > 0) {
      const nodesTarget = await this.nodeRepository.findByIdIn(
        edges.map((e) => e.target),
      );
      for (const n of nodesTarget) {
        const dataTransfer: INextJob = {
          currentNodeId: n._id,
          organizationId: user.organizationId,
          environmentId: user.environmentId,
          target: target,
          workflowId,
          workflowName,
          userId: user._id,
          overrides: overrides,
          transactionId: transactionId,
        };

        await this.sender.produce({
          messages: [
            {
              key: user._id,
              value: JSON.stringify(dataTransfer),
            },
          ],
          topic: process.env.KAFKA_NEXT_JOB_TOPIC ?? '',
        });
      }
    }
  }

  private async validateVariables(
    variables: IVariable[],
    payload: CreateTriggerDto,
  ) {
    const validateType = (v: IVariable, val: any) => {
      if (typeof val !== v.type) {
        throw new PreconditionFailedException({
          [v.name]: `${v.name} invalid type. Require type ${v.type}`,
        });
      }
    };

    for (const v of variables) {
      const val = get(payload.target, v.name);

      if (v.required && !val)
        throw new PreconditionFailedException({
          [v.name]: `${v.name} is required`,
        });
      else if (val) {
        validateType(v, val);
      }
    }

    return false;
  }

  async getLogTrigger(
    u: IJwtPayload,
    payload: GetLogTriggerRequestDto,
  ): Promise<GetLogTriggerResponseDto> {
    return {
      page: payload.page,
      pageSize: payload.limit,
      totalCount: await this.logRepository.count({
        _userId: u._id,
        _environmentId: u.environmentId,
        _organizationId: u.organizationId,
      }),
      data: await this.logRepository.find(
        {
          _userId: u._id,
          _environmentId: u.environmentId,
          _organizationId: u.organizationId,
        },
        undefined,
        {
          skip: payload.page * payload.limit,
          limit: payload.limit,
          sort: {
            createdAt: -1,
          },
        },
      ),
    };
  }

  async delLogTrigger(u: IJwtPayload, id: string) {
    this.logRepository.delete({
      _userId: u._id,
      _environmentId: u.environmentId,
      _organizationId: u.organizationId,
      _id: id,
    });
  }
}
