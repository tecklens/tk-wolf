import { GetSubscriberResponse } from '@app/subscription/dtos/get-subscriber.response';
import { IPageResponse } from '@wolf/stateless';

export class GetSubscribersResponse
  implements IPageResponse<GetSubscriberResponse>
{
  data: GetSubscriberResponse[];
  total: number;
}
