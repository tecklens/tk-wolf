import { Injectable } from '@nestjs/common';
import {
  InjectStripeClient,
  StripeWebhookHandler,
} from '@golevelup/nestjs-stripe';
import { Stripe } from 'stripe';

@Injectable()
export class PaymentService {
  constructor(@InjectStripeClient() private stripeClient: Stripe) {}

  @StripeWebhookHandler('payment_intent.created')
  handlePaymentIntentCreated(evt: any) {
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

  async createPaymentIndent() {
    const paymentIndent: Stripe.Response<Stripe.PaymentIntent> =
      await this.stripeClient.paymentIntents.create({
        currency: 'usd',
        amount: 1999,
        automatic_payment_methods: {
          enabled: true,
        },
      });

    return paymentIndent.client_secret;
  }
}
