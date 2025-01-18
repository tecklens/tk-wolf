import { Injectable, Logger } from '@nestjs/common';
import { ProducerService } from '@app/kafka/producer/producer.service';
import { TaskRepository } from '@libs/repositories/task';
import { ITaskTimeline } from '@wolfxlabs/stateless';
import { EmailEventTrackingDto } from './dtos';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventsGateway } from '@app/events/events.gateway';

@Injectable()
export class EventsService {
  private topicTaskTimeline: string;
  private logger = new Logger('EventsService');
  constructor(
    private readonly producerService: ProducerService,
    private readonly taskRepository: TaskRepository,
    private readonly eventsGateway: EventsGateway,
  ) {
    this.topicTaskTimeline = process.env.KAFKA_LOG_TASK_TIMELINE;
  }
  async logEmailTracking(taskId: string, event: EmailEventTrackingDto) {
    this.logger.log(taskId, JSON.stringify(event));

    if (taskId) {
      const task = await this.taskRepository.findById(
        taskId,
        '_userId _workflowId',
      );
      if (task) {
        this.producerService.sendEvent<ITaskTimeline>(this.topicTaskTimeline, {
          type: event.type,
          createdAt: new Date(),
          data: {
            _userId: task._userId,
            _taskId: taskId,
            _workflowId: task._workflowId,
            createdBy: task._userId,
          },
        });
      }
    }
  }

  async pingEvent() {
    return this.eventsGateway.sendMessage<{ key: string }>({
      identifier: 'abc',
      subscriberId: 'iur',
      data: {
        key: 'ahdsk',
      },
    });
  }
}
