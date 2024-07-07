import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CacheModule } from '@nestjs/cache-manager';

import { redisStore } from 'cache-manager-redis-yet';
import { DbService } from '@libs/repositories/DbService';
import { S3Module } from 'nestjs-s3';
import { FileModule } from './file/file.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { EnvironmentModule } from './environment/environment.module';
import { WorkflowModule } from './workflow/workflow.module';
import { OrganizationModule } from './organization/organization.module';
import { KafkaModule } from './kafka/kafka.module';
import { TriggerModule } from './trigger/trigger.module';
import { EventsModule } from './events/events.module';
import { RolesGuard } from '@app/auth/strategy/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { ProviderModule } from './provider/provider.module';
import { LogModule } from './log/log.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { SubscriptionModule } from './subscription/subscription.module';

export const dbService = {
  provide: DbService,
  useFactory: async () => {
    const service = new DbService();
    await service.connect(String(process.env.MONGO_URL));

    return service;
  },
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 30 * 1000, // * 30 second
      max: 100,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
              ? parseInt(process.env.REDIS_PORT)
              : 6379,
          },
        }),
      }),
    }),
    S3Module.forRoot({
      config: {
        credentials: {
          accessKeyId: process.env.S3_STORAGE_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_STORAGE_SECRET_ACCESS_KEY,
        },
        region: 'ap-southeast-1',
        // endpoint:
        //   's3://arn:aws:s3:ap-southeast-1:879019563185:accesspoint/wolf-point',
        forcePathStyle: true,
      },
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // * millisecond - 1s
        limit: 2000,
      },
      {
        name: 'medium',
        ttl: 1500, // * millisecond
        limit: 4000,
      },
    ]),
    AuthModule,
    UsersModule,
    FileModule,
    EnvironmentModule,
    WorkflowModule,
    OrganizationModule,
    KafkaModule,
    TriggerModule,
    EventsModule,
    ProviderModule,
    LogModule,
    PaymentModule,
    NotificationModule,
    SubscriptionModule,
  ],
  providers: [
    AppService,
    dbService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [dbService],
  controllers: [],
})
export class AppModule {}
