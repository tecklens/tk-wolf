import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';
import { ExternalApiAccessible } from '@tps/decorators/external-api.decorator';
import { PaymentService } from '@app/payment/payment.service';

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
  createPaymentIndent(): Promise<string> {
    return this.paymentService.createPaymentIndent();
  }
}
