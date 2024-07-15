import { BadRequestException, Injectable } from '@nestjs/common';
import {
  InjectStripeClient,
  StripeWebhookHandler,
} from '@golevelup/nestjs-stripe';
import { Stripe } from 'stripe';
import { IJwtPayload } from '@libs/shared/types';
import { CreatePaymentIndentDto } from '@app/payment/dtos/create-payment-indent.dto';
import { UserPlan, UserRepository } from '@libs/repositories/user';
import { BillingRepository } from '@libs/repositories/billing/billing.repository';
import { IBilling } from '@libs/repositories/billing/types';
import { LimitService } from '@app/auth/limit.service';
import { encryptSecret } from '@libs/shared/encryptions/encrypt-provider';

@Injectable()
export class PaymentService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly billingRepository: BillingRepository,
    private readonly limitService: LimitService,
    @InjectStripeClient() private stripeClient: Stripe,
  ) {}

  @StripeWebhookHandler('payment_intent.succeeded')
  async handlePaymentIntentSuccess(evt: Stripe.Event) {
    // execute your custom business logic
    const k: any = evt?.data?.object;
    const metadata = k.metadata;
    const evtObj: IBilling = {
      amount: k.amount,
      amount_received: k.amount_received,
      application_fee_amount: k.application_fee_amount,
      transactionId: evt.id,
      status: 0,
      _environmentId: metadata?.environmentId,
      _organizationId: metadata?.organizationId,
      client_secret: encryptSecret(k.client_secret),
      metadata: k.metadata,
      payment_method: encryptSecret(k.payment_method),
      created: k.created,
    };
    if (metadata.userId && metadata.plan) {
      try {
        const plan = parseInt(metadata.plan);
        const userId = metadata.userId;

        const user = await this.userRepository.findById(userId, '_id plan');

        evtObj._userId = user._id;
        evtObj.status = 1;
        await this.userRepository.updateOne(
          {
            _id: user._id,
          },
          {
            plan: plan,
          },
        );
        await this.limitService
          .getLimiter()
          .delete(`${user._id}_${metadata?.environmentId}`);
      } catch (e) {
        evtObj.status = 1;
      } finally {
        await this.billingRepository.create(evtObj);
      }
    }
    console.log('evt', k?.amount_received);
  }

  @StripeWebhookHandler('payment_intent.payment_failed')
  handlePaymentIntentFailed(evt: any) {
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
    if (payload.plan === undefined || payload.plan === user.plan) {
      throw new BadRequestException('New pricing plan invalid');
    }

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
        amountPlan = 1000000;
        break;
    }

    const paymentIndent: Stripe.Response<Stripe.PaymentIntent> =
      await this.stripeClient.paymentIntents.create({
        currency: 'usd',
        amount: amountPlan,
        off_session: false,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          plan: payload.plan,
          userId: user._id,
          environmentId: u.environmentId,
          organizationId: u.organizationId,
        },
      });

    return paymentIndent.client_secret;
  }
}
