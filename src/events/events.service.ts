import { Injectable, Logger } from '@nestjs/common';
import { EmailEventTrackingDto } from '@app/events/dtos/email-event-tracking.dto';

@Injectable()
export class EventsService {
  private logger = new Logger('EventsService');
  async logEmailTracking(transactionId: string, event: EmailEventTrackingDto) {
    this.logger.log(transactionId, JSON.stringify(event));
  }
}
