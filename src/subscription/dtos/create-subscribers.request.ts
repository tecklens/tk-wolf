import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CreateSubscriberRequest } from './create-subscriber.request';

export class CreateSubscribersRequest {
  @ApiProperty()
  @IsString()
  channel_id: string;

  @ApiProperty()
  @IsArray()
  targets: CreateSubscriberRequest[];
}
