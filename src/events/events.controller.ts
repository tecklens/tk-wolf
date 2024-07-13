import { Controller, Get, Param, Query } from '@nestjs/common';
import { EmailEventTrackingDto } from '@app/events/dtos/email-event-tracking.dto';
import { EventsService } from '@app/events/events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Get('email/tracking/:taskId')
  async logEmailTracking(
    @Param('taskId') taskId: string,
    @Query() query: EmailEventTrackingDto,
  ) {
    return this.eventsService.logEmailTracking(taskId, query);
  }
}
