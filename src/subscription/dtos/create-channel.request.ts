import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CreateSubscriberRequest } from './create-subscriber.request';

export class CreateChannelRequest {
  @ApiProperty()
  @IsString()
  channelName: string;

  @ApiPropertyOptional()
  @IsString()
  channelDescription: string;

  @ApiPropertyOptional()
  @IsArray()
  targets: CreateSubscriberRequest[];
}
