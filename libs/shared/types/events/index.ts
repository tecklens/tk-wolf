import { EventTypes } from '@libs/shared/types/events/event-types';

export enum TriggerRecipientsTypeEnum {
  SUBSCRIBER = 'Subscriber',
  TOPIC = 'Topic',
}

export interface IEventQueue<T> {
  type: EventTypes;
  createdAt: Date;
  data: T;
}
