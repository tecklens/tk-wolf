import { Module } from '@nestjs/common';
import { TriggerService } from './trigger.service';
import { TriggerController } from './trigger.controller';
import { KafkaModule } from '@app/kafka/kafka.module';
import { EventsModule } from '@app/events/events.module';
import { EventsGateway } from '@app/events/events.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [KafkaModule, EventsModule],
  providers: [TriggerService, EventsGateway, JwtService],
  controllers: [TriggerController],
})
export class TriggerModule {}
