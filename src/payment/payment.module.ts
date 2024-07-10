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
      useFactory: async (configSvc: ConfigService) => ({
        apiKey:
          'sk_test_51OEMRZGcJkgHU4pfc3P5Gi7itVP1N9yxYVmrj5TFrYVnkYLE1eknqFPmOPzoA82okIAiH87iU0ICZLbghWqAQVC7007SfteeeI',
        webhookConfig: {
          stripeWebhookSecret:
            'whsec_25b58266dcbbcdebc4bd61d9035f11c5463e3b585f7cc4c789097df9e6720e84',
          stripeSecrets: {
            account:
              'whsec_25b58266dcbbcdebc4bd61d9035f11c5463e3b585f7cc4c789097df9e6720e84',
            accountTest:
              'whsec_25b58266dcbbcdebc4bd61d9035f11c5463e3b585f7cc4c789097df9e6720e84',
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
