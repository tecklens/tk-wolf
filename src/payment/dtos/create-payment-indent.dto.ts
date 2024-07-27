import { ApiProperty } from '@nestjs/swagger';
import { UserPlan } from '@wolfxlabs/stateless';

export class CreatePaymentIndentDto {
  @ApiProperty()
  plan: UserPlan;

  frequency: string;
}
