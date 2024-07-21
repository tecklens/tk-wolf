import { NotificationEntity } from '@libs/repositories/notification';
import { IPageResponse } from '@wolfxlabs/stateless';

export class ListNotificationDto implements IPageResponse<NotificationEntity> {
  data: NotificationEntity[];
  total: number;
}
