import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    StripeModule.forRootAsync(StripeModule, {
      imports: [ConfigModule],
      useFactory: async (configSvc: ConfigService) => ({
        apiKey:
          'sk_test_51OEMRZGcJkgHU4pfc3P5Gi7itVP1N9yxYVmrj5TFrYVnkYLE1eknqFPmOPzoA82okIAiH87iU0ICZLbghWqAQVC7007SfteeeI',
        webhookConfig: {
          stripeSecrets: {
            account: 'acct_1OEMRZGcJkgHU4pf',
            connect:
              'whsec_25b58266dcbbcdebc4bd61d9035f11c5463e3b585f7cc4c789097df9e6720e84',
          },
        },
      }),
    }),
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
