import {
  ChannelTypeEnum,
  IChatProvider,
  ISendMessageSuccessResponse,
} from '@wolfxlabs/stateless';
import axios from 'axios';
import { IDataTelegram } from './types';

export class TelegramProvider implements IChatProvider {
  channelType = ChannelTypeEnum.CHAT as ChannelTypeEnum.CHAT;
  public id = 'telegram';
  private axiosInstance = axios.create();

  async sendMessage(data: IDataTelegram): Promise<ISendMessageSuccessResponse> {
    if (!data.token) {
      return Promise.reject('Telegram Bot Token not provided!');
    }

    let url = data.webhookUrl ?? 'https://api.telegram.org';

    if (!url.includes(`/bot`)) {
      url =
        url +
        `/bot${data.token}${data.testEnvironment ? '/test' : ''}/sendMessage`;
    }

    const form = new FormData();

    form.append('text', data.content);
    form.append('chat_id', data.chatId);

    const response = await this.axiosInstance.post(url, form);

    return {
      id: response.data['result']['message_id'],
      date: new Date().toISOString(),
    };
  }
}
