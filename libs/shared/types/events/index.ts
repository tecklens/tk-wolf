import { TopicKey } from '../topic';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';
import { EventTypes } from '@libs/shared/types/events/event-types';

export enum TriggerRecipientsTypeEnum {
  SUBSCRIBER = 'Subscriber',
  TOPIC = 'Topic',
}

export interface ITopic {
  type: TriggerRecipientsTypeEnum.TOPIC;
  topicKey: TopicKey;
}

export interface IEventQueue {
  type: EventTypes;
  createdAt: Date;
  data: any;
}
