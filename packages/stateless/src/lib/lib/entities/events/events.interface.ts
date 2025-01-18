import { EventTypes } from './event-types.enum';

export interface IEventQueue<T> {
  type: EventTypes;
  createdAt: Date;
  data: T;
}

export interface IEvent {
  userId: string;
  event: string;
  data: string;
}
