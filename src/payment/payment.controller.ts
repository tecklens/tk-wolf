import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/strategy';
import { PaymentService } from '@app/payment/payment.service';
import { UserSession } from '@libs/utils/user.session';
import { ExternalApiAccessible, IJwtPayload } from '@wolfxlabs/stateless';
import { CreatePaymentIndentDto } from './dtos';

@Controller('payment')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Get('/config/:email')
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getOne(@Param('email') email: string): Promise<string> {
    return this.paymentService.getConfig(email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create-payment-indent')
  @ExternalApiAccessible()
  createPaymentIndent(
    @UserSession() user: IJwtPayload,
    @Body() payload: CreatePaymentIndentDto,
  ): Promise<string> {
    return this.paymentService.createPaymentIndent(user, payload);
  }
}
