import { EventTypes } from '@libs/shared/types/events/event-types';
import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailEventTrackingDto {
  @IsEnum(EventTypes)
  @ApiProperty()
  type: EventTypes;

  @IsString()
  @ApiProperty()
  tx_id?: string;
}
