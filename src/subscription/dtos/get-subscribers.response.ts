import { IPageResponse } from '@tps/index';
import { GetSubscriptionResponse } from '@app/subscription/dtos/get-subscription.response';

export class GetSubscriptionsResponse
  implements IPageResponse<GetSubscriptionResponse>
{
  data: GetSubscriptionResponse[];
  total: number;
}
