import {
  ChannelTypeEnum,
  IChatOptions,
  IChatProvider,
  ISendMessageSuccessResponse,
} from '@wolfxlabs/stateless';
import axios from 'axios';

export class SlackProvider implements IChatProvider {
  channelType = ChannelTypeEnum.CHAT as ChannelTypeEnum.CHAT;
  public id = 'slack';
  private axiosInstance = axios.create();

  async sendMessage(data: any): Promise<ISendMessageSuccessResponse> {
    const response = await this.axiosInstance.post(data.webhookUrl, {
      text: data.content,
      blocks: data.blocks,
    });

    return {
      id: response.headers['x-slack-req-id'],
      date: new Date().toISOString(),
    };
  }
}
