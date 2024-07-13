import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { JwtService } from '@nestjs/jwt';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  providers: [EventsGateway, JwtService, EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
