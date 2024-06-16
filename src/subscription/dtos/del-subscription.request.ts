import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CreateSubscriptionRequest } from '@app/subscription/dtos/create-subscription.request';

export class DelSubscriptionRequest {
  @ApiProperty()
  @IsString()
  subscriptionId: string;
}
