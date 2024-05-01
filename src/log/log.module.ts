import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { LogRepository } from '@libs/repositories/log/log.repository';

@Module({
  providers: [LogService, LogRepository],
  controllers: [LogController],
})
export class LogModule {}
