import { Injectable, Logger } from '@nestjs/common';
import { ProducerService } from '@app/kafka/producer/producer.service';
import { TaskRepository } from '@libs/repositories/task';
import {
  EventTypes,
  IJwtPayload,
  ITaskTimeline,
  TaskStatus,
} from '@wolfxlabs/stateless';
import { GetTaskRequestDto, TaskResponseDto } from './dtos';

@Injectable()
export class TaskService {
  private logger = new Logger('TaskService');
  private topicTaskTimeline: string;

  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly producerService: ProducerService,
  ) {
    this.topicTaskTimeline = process.env.KAFKA_LOG_TASK_TIMELINE;
  }

  async getTasks(
    u: IJwtPayload,
    payload: GetTaskRequestDto,
  ): Promise<TaskResponseDto> {
    let query: any = {
      _userId: u._id,
      _environmentId: u.environmentId,
      _organizationId: u.organizationId,
    };

    if (payload.status && payload.status.length > 0) {
      query = {
        ...query,
        status: {
          $in: payload.status,
        },
      };
    }

    return {
      page: payload.page,
      pageSize: payload.limit,
      totalCount: await this.taskRepository.count(query),
      data: await this.taskRepository.find(
        query,
        '_id _workflowId _userId _environmentId _organizationId workflowName _providerId providerName channel transactionId createdAt code name status priority',
        {
          skip: payload.page * payload.limit,
          limit: payload.limit,
          sort: { createdAt: -1 },
        },
      ),
    };
  }

  async delTask(u: IJwtPayload, code: string) {
    await this.taskRepository.delete({
      code: code,
      _userId: u._id,
    });
  }
}
