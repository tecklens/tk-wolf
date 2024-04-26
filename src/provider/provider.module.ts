import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';

@Module({
  providers: [ProviderService],
  controllers: [ProviderController, JwtAuthGuard],
})
export class ProviderModule {}
