import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';
import { ProviderRepository } from '@libs/repositories/provider';

@Module({
  providers: [ProviderService, ProviderRepository, JwtAuthGuard],
  controllers: [ProviderController],
})
export class ProviderModule {}
