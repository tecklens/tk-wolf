import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Module } from 'nestjs-s3';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // * millisecond
        limit: 30,
      },
      {
        name: 'medium',
        ttl: 1000, // * millisecond
        limit: 100,
      },
      {
        name: 'long',
        ttl: 1000,
        limit: 500,
      },
    ]),
    S3Module.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        config: {
          credentials: {
            accessKeyId: config.get('S3_STORAGE_ACCESS_KEY_ID'),
            secretAccessKey: config.get('S3_STORAGE_SECRET_ACCESS_KEY'),
          },
          region: 'us-east-1',
          endpoint: config.get('S3_URL'),
          forcePathStyle: true,
          signatureVersion: 'v4',
        },
      }),
    }),
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
