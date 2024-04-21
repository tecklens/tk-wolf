import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CacheModule } from '@nestjs/cache-manager';

import { redisStore } from 'cache-manager-redis-yet';
import { DbService } from '@libs/repositories/DbService';

const dalService = {
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
      ttl: 5 * 1000,
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
    AuthModule,
    UsersModule,
  ],
  providers: [AppService, dalService],
  exports: [dalService],
  controllers: [],
})
export class AppModule {}
