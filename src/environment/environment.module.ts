import { Module } from '@nestjs/common';
import { EnvironmentController } from '@app/environment/environment.controller';
import { EnvironmentService } from '@app/environment/environment.service';
import { EnvironmentRepository } from '@libs/repositories/environment';

@Module({
  imports: [],
  providers: [EnvironmentService, EnvironmentRepository],
  exports: [EnvironmentService],
  controllers: [EnvironmentController],
})
export class EnvironmentModule {}
