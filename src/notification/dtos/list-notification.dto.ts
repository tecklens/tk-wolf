import { IPageResponse } from '@tps/index';
import { NotificationEntity } from '@libs/repositories/notification';

export class ListNotificationDto implements IPageResponse<NotificationEntity> {
  data: NotificationEntity[];
  total: number;
}
