import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { UserPlan } from '@libs/repositories/user';

export class CreatePaymentIndentDto {
  @ApiProperty()
  @IsEnum(UserPlan)
  plan: UserPlan;
}
