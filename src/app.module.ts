import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbService } from '@pak/services/db.service';
import { FeatureFlagsService } from '@pak/services/feature-flags.service';

export const featureFlagsService = {
  provide: FeatureFlagsService,
  useFactory: async (): Promise<FeatureFlagsService> => {
    const instance = new FeatureFlagsService();
    await instance.initialize();

    return instance;
  },
};

const dbService = {
  provide: DbService,
  useFactory: async () => {
    const service = new DbService();
    await service.connect(process.env.MONGO_URL);

    return service;
  },
};

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, dbService, featureFlagsService],
})
export class AppModule {}
