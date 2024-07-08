import { IChatOptions } from '@novu/stateless';

export interface IDataTelegram extends IChatOptions {
  baseUrl?: string;
  token: string;
  testEnvironment?: boolean;
  chatId: string;
}
