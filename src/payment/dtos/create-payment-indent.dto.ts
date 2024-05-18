import { ApiProperty } from '@nestjs/swagger';
import { UserPlan } from '@libs/repositories/user';

export class CreatePaymentIndentDto {
  @ApiProperty()
  plan: UserPlan;

  frequency: string;
}
