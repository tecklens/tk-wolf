import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ThrottlerModule } from '@nestjs/throttler';

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
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
