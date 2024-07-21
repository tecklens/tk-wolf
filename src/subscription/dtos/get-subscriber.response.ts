export class GetSubscriberResponse {
  _id: string;
  _userId: string;
  channelId: string;
  channelName: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  locale?: string;
  overrides?: any;
}
