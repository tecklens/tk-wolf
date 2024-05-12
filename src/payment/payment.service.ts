import { BadRequestException, Injectable } from '@nestjs/common';
import {
  InjectStripeClient,
  StripeWebhookHandler,
} from '@golevelup/nestjs-stripe';
import { Stripe } from 'stripe';
import { IJwtPayload } from '@libs/shared/types';
import { CreatePaymentIndentDto } from '@app/payment/dtos/create-payment-indent.dto';
import { UserPlan, UserRepository } from '@libs/repositories/user';

@Injectable()
export class PaymentService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectStripeClient() private stripeClient: Stripe,
  ) {}

  @StripeWebhookHandler('payment_intent.succeeded')
  handlePaymentIntentSuccess(evt: any) {
    // execute your custom business logic
    console.log(evt);
  }

  @StripeWebhookHandler('payment_intent.payment_failed')
  handlePaymentIntentFailed(evt: any) {
    // execute your custom business logic
    console.log(evt);
  }

  @StripeWebhookHandler('payment_intent.succeeded')
  handlePaymentIntentSucceeded(evt: any) {
    // execute your custom business logic
    console.log(evt);
  }

  async getConfig(email: string) {
    const customer = await this.stripeClient.customers.create({
      email: 'diep.tv1999@gmail.com',
    });

    return customer.id;
  }

  async createPaymentIndent(u: IJwtPayload, payload: CreatePaymentIndentDto) {
    const user = await this.userRepository.findById(u._id, 'plan');

    let amountPlan = 0;
    switch (payload.plan) {
      case UserPlan.free:
        throw new BadRequestException('Invalid plan');
      case UserPlan.silver:
        amountPlan = 5000; // * 50$
        break;
      case UserPlan.gold:
        amountPlan = 20000; // * 200$
        break;
      case UserPlan.diamond:
        amountPlan = 50000; // * 500$
        break;
      default:
        amountPlan = 10000000;
        break;
    }

    const paymentIndent: Stripe.Response<Stripe.PaymentIntent> =
      await this.stripeClient.paymentIntents.create({
        currency: 'usd',
        amount: amountPlan,
        automatic_payment_methods: {
          enabled: true,
        },
      });

    return paymentIndent.client_secret;
  }
}
