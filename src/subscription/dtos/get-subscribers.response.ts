import { GetSubscriberResponse } from '@app/subscription/dtos/get-subscriber.response';
import { IPageResponse } from '@wolfxlabs/stateless';

export class GetSubscribersResponse
  implements IPageResponse<GetSubscriberResponse>
{
  data: GetSubscriberResponse[];
  total: number;
}
