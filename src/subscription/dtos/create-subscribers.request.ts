import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CreateSubscriptionRequest } from '@app/subscription/dtos/create-subscription.request';

export class CreateSubscriptionsRequest {
  @ApiProperty()
  @IsString()
  channel_id: string;

  @ApiProperty()
  @IsArray()
  targets: CreateSubscriptionRequest[];
}
