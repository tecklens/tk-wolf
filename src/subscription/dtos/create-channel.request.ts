import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CreateSubscriptionRequest } from '@app/subscription/dtos/create-subscription.request';

export class CreateChannelRequest {
  @ApiProperty()
  @IsString()
  channelName: string;

  @ApiPropertyOptional()
  @IsString()
  channelDescription: string;

  @ApiPropertyOptional()
  @IsArray()
  targets: CreateSubscriptionRequest[];
}
