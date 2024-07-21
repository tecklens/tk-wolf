import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@libs/repositories/notification';
import { EventsGateway } from '@app/events/events.gateway';
import {
  CreateNotiDto,
  ListNotificationDto,
  NotificationsRequestDto,
} from './dtos';
import { IEvent, IJwtPayload } from '@wolf/stateless';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly event: EventsGateway,
  ) {}

  async create(payload: CreateNotiDto) {
    const noti = await this.notificationRepository.create({
      _environmentId: payload.environmentId,
      _organizationId: payload.organizationId,
      _subscriberId: '6651a1b64c43c0a54f4a55f9',
      _templateId: '6651a1b64c43c0a54f4a55f9',
      _userId: payload.userId,
      payload: {
        title: payload.title,
        description: payload.description,
      },
    });

    this.emitEventNotiWs(payload.userId, {
      event: 'notification',
      userId: payload.userId,
      data: JSON.stringify(noti),
    });
  }

  async getListNotification(
    u: IJwtPayload,
    params: NotificationsRequestDto,
  ): Promise<ListNotificationDto> {
    return {
      data: await this.notificationRepository.findByUserId(
        u.environmentId,
        u._id,
        params.page * params.limit,
        params.limit,
      ),
      total: await this.notificationRepository.count({
        _userId: u._id,
        _environmentId: u.environmentId,
      }),
    };
  }

  async markAll(u: IJwtPayload) {
    await this.notificationRepository.update(
      {
        _userId: u._id,
        _environmentId: u.environmentId,
      },
      {
        marked: true,
      },
    );
  }

  async mark(u: IJwtPayload, id: string) {
    await this.notificationRepository.updateOne(
      {
        _id: id,
        _userId: u._id,
        _environmentId: u.environmentId,
      },
      {
        marked: true,
      },
    );
  }

  emitEventNotiWs(userId: string, data: IEvent) {
    this.event.server.emit(`event_${userId}`, data);
  }
}
