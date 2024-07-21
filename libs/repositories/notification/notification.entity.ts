import {
  ChangePropsValueType,
  EnvironmentId,
  ISubscribersDefine,
  OrganizationId,
  StepTypeEnum,
} from '@wolf/stateless';

export class NotificationEntity {
  _id: string;

  _templateId: string;
  _userId: string;

  _environmentId: EnvironmentId;

  _organizationId: OrganizationId;

  _subscriberId: string;

  transactionId: string;

  channels?: StepTypeEnum[];

  _digestedNotificationId?: string;

  /*
   * This is a field that is used to define the subscriber that will receive the notification.
   * This field simplifies metric retrieval by associating external subscriber data, such as subscriberId.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  to?: ISubscribersDefine | any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;

  marked: boolean;

  createdAt?: string;
  updatedAt?: string;
  expireAt?: string;
}

export type NotificationDBModel = ChangePropsValueType<
  NotificationEntity,
  '_environmentId' | '_organizationId' | '_templateId' | '_subscriberId'
>;
