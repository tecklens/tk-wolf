import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from '@libs/repositories/user';
import { SkipThrottle } from '@nestjs/throttler';
import { BillingRepository } from '@libs/repositories/billing/billing.repository';
import { LimitService } from '@app/auth/limit.service';

@Module({
  imports: [
    StripeModule.forRootAsync(StripeModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_API_KEY'),
        webhookConfig: {
          stripeWebhookSecret: configService.get('STRIPE_WEBHOOK_SECRET'),
          stripeSecrets: {
            account: configService.get('STRIPE_WEBHOOK_SECRET'),
            accountTest: configService.get('STRIPE_WEBHOOK_SECRET'),
          },
          requestBodyProperty: 'rawBody',
          decorators: [SkipThrottle()],
        },
      }),
    }),
  ],
  providers: [PaymentService, LimitService, UserRepository, BillingRepository],
  controllers: [PaymentController],
})
export class PaymentModule {}
