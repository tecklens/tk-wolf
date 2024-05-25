import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationRepository } from '@libs/repositories/notification';
import { EventsGateway } from '@app/events/events.gateway';
import { JwtService } from '@nestjs/jwt';
import { NotificationController } from './notification.controller';

@Module({
  providers: [
    NotificationService,
    NotificationRepository,
    EventsGateway,
    JwtService,
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
