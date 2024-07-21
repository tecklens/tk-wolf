import { Module } from '@nestjs/common';
import { WorkflowService } from '@app/workflow/workflow.service';
import { WorkflowController } from '@app/workflow/workflow.controller';
import { WorkflowRepository } from '@libs/repositories/workflow';
import { NodeRepository } from '@libs/repositories/node';
import { EdgeRepository } from '@libs/repositories/edge';
import { EmailTemplateRepository } from '@libs/repositories/email-templates';
import { VariableRepository } from '@libs/repositories/variable';
import { KafkaModule } from '@app/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [
    WorkflowService,
    WorkflowRepository,
    NodeRepository,
    EdgeRepository,
    EmailTemplateRepository,
    VariableRepository,
  ],
  exports: [WorkflowService],
  controllers: [WorkflowController],
})
export class WorkflowModule {}
