import { Controller, Get, Param, Query } from '@nestjs/common';
import { EmailEventTrackingDto } from '@app/events/dtos/email-event-tracking.dto';
import { EventsService } from '@app/events/events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Get('email/tracking/:transactionId')
  async logEmailTracking(
    @Param('transactionId') transactionId: string,
    @Query() query: EmailEventTrackingDto,
  ) {
    return this.eventsService.logEmailTracking(transactionId, query);
  }
}
