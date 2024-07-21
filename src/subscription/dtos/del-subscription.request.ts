import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DelSubscriptionRequest {
  @ApiProperty()
  @IsString()
  subscriptionId: string;
}
