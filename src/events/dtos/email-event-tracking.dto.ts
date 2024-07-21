import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EventTypes } from '@wolf/stateless';

export class EmailEventTrackingDto {
  @IsEnum(EventTypes)
  @ApiProperty()
  type: EventTypes;

  @IsString()
  @ApiProperty()
  tx_id?: string;
}
